// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { System } from "@latticexyz/world/src/System.sol";
import { GameEnv, GameEnvData, Player, PlayerData, Record, RecordData } from "../codegen/index.sol";

contract CoreSystem is System {
  function registerPlayer() public returns (uint16 uuid) {
    GameEnvData memory env = GameEnv.get();
    uuid = env.playerNumber + 1;
    GameEnv.setPlayerNumber(uuid);
    Player.setUuid(_msgSender(), uuid);
  }

  function startGame() public {
    address player = _msgSender();

  }


  function _getRandomNumber() internal returns (uint256 r) {
    r = uint256(keccak256(abi.encode(_msgSender(), blockhash(block.number - 1), block.number, gasleft())));
  }
}
