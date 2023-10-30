// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import "forge-std/Test.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { GameEnv, GameEnvData, PlayerInfo, Player, PlayerData, Record, RecordData } from "../codegen/index.sol";

contract CoreSystem is System {
  function register() public returns (uint16 uuid) {
    GameEnvData memory env = GameEnv.get();
    uuid = env.playerNumber + 1;
    require(uuid < 10001, "player list is full");
    GameEnv.setPlayerNumber(uuid);
    PlayerInfo.setUuid(_msgSender(), uuid);
  }

  function startGame() public {
    address player = _msgSender();
    GameEnvData memory env = GameEnv.get();
    PlayerData memory data = Player.get(player);
    require(data.lastUpdate == 0 || block.number > data.lastUpdate + env.actionPeriod, "last game not ended");
    _checkAndRecordScore(player);
    Player.set(player, PlayerData({
      level: 0,
      value: env.initialValue,
      left: _generateGear(1),
      right: _generateGear(1),
      nextLeft: _generateGear(2),
      nextRight: _generateGear(2),
      robber: 0,
      lastUpdate: uint64(block.number)
    }));
  }

  function passThrough(bool isLeft) public {
    address player = _msgSender();
    GameEnvData memory env = GameEnv.get();
    PlayerData memory data = Player.get(player);
    require(block.number <= data.lastUpdate + env.actionPeriod, "defeated");
    require((data.level % env.robberRate != 0) || data.robber == 0, "beat the robber");
    uint16 newValue = _enterGear(data.value, isLeft? data.left : data.right);
    console.log("new value %d", newValue);
    if (newValue == 0) {
      _recordScore(player, data.level, newValue);
      return;
    }
    uint16 levelNum = data.level + 1;
    if (levelNum == env.levelNumber) {
      _recordScore(player, levelNum, newValue);
      return;
    }
    Player.set(player, PlayerData({
      level: levelNum,
      value: newValue,
      left: data.nextLeft,
      right: data.nextRight,
      nextLeft: _generateGear(levelNum + 2),
      nextRight: _generateGear(levelNum + 2),
      robber: _generateRobber(data.robber, levelNum, env.playerNumber, env.levelNumber, env.robberRate),
      lastUpdate: uint64(block.number)
    }));
  }

  function battle() public {
    address player = _msgSender();
    GameEnvData memory env = GameEnv.get();
    PlayerData memory data = Player.get(player);
    require(block.number <= data.lastUpdate + env.actionPeriod, "defeated");
    uint16 playerId = PlayerInfo.getUuid(player);
    uint16 robberId = uint16(data.robber >> 16);
    uint16 robberValue = uint16(data.robber);
    // if a player has not yet registered
    if (playerId == 0) {
      if (data.value > robberValue) {
        Player.setValue(player, data.value - robberValue);
        Player.setRobber(player, 0);
      } else {
        Player.deleteRecord(player);
      }
      return;
    }
    if (robberId == playerId) {
      Player.setValue(player, data.value + robberValue);
      Player.setRobber(player, 0);
      return;
    }
    uint64 playerScore = Record.getScore(playerId);
    uint64 robberScore = Record.getScore(robberId);
    if (data.value > robberValue) {
      Player.setValue(player, data.value - robberValue);
      Player.setRobber(player, 0);
      if (robberScore > 0) {
        Record.setScore(playerId, playerScore + 1);
        Record.setScore(robberId, robberScore - 1);
      }  
    } else {
      if (playerScore > 0) {
        Record.setScore(playerId, playerScore - 1);
        Record.setScore(robberId, robberScore + 1);
      } 
      _recordScore(player, data.level, 0);
    }
  }

  function _generateGear(uint256 level) internal returns (uint24 gear) {
    uint256 r = _getRandomNumber();
    // 0: +    1: -
    uint256 operation = r % 2;
    r >>= 8;
    uint256 change = (r % (level * 10)) + 1;
    gear = uint24((operation << 16) + change);
  }

  function _enterGear(uint256 curValue, uint256 gear) internal returns (uint16 value) {
    uint256 change = uint16(gear);
    if (gear > 65536) {
      value = change < curValue ? uint16(curValue - change) : 0;
    } else {
      value = uint16(curValue + change);
    }
  }

  function _generateRobber(uint256 oldRobber, uint256 level, uint256 playerNumber, uint256 maxLevel, uint256 robberRate) internal returns (uint32 robber) {
    if ((level + 1) % robberRate != 0) return uint32(oldRobber);
    uint256 r = _getRandomNumber();
    if (playerNumber < 10) {
      robber = uint32((r % (level * level)) + 1);
    } else {
      uint256 robberId = r % (playerNumber + 1);
      uint256 robberValue = uint256(Record.getHighestValue(uint16(robberId))) * (level * level) / (maxLevel * maxLevel);
      if (robberValue == 0) {
        r >>= 16;
        robber = uint32((r % (level * level)) + 1);
      } else {
        robber = uint32((robberId << 16) + robberValue);
      }
    }
  }

  function calScore(uint256 level, uint256 value) public returns (uint64 score) {
    return uint64((level / 10) + (value / 5000));
  }

  function _checkAndRecordScore(address player) internal {
    PlayerData memory data = Player.get(player);
    if (data.level > 0) {
      _recordScore(player, data.level, 0);
    }
  }

  function _recordScore(address player, uint256 level, uint256 value) internal {
    uint16 uuid = PlayerInfo.getUuid(player);
    if (uuid == 0) {
      return;
    }
    RecordData memory record = Record.get(uuid);
    Record.set(uuid, RecordData({
      addr: player,
      highestValue: value > record.highestValue ? uint16(value) : record.highestValue,
      score: record.score + calScore(level, value)
    }));
    Player.deleteRecord(player);
  }

  function _getRandomNumber() internal returns (uint256 r) {
    r = uint256(keccak256(abi.encode(_msgSender(), blockhash(block.number - 1), block.number, gasleft())));
  }
}
