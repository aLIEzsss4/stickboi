// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { getKeysWithValue } from "@latticexyz/world-modules/src/modules/keyswithvalue/getKeysWithValue.sol";

import { IWorld } from "../src/codegen/world/IWorld.sol";
import { GameEnv, GameEnvData, PlayerInfo, Player, PlayerData, Record, RecordData } from "../src/codegen/index.sol";

contract CoreTest is MudTest {
  GameEnvData env;
  
  function setUp() public override {
    super.setUp();
    env = GameEnv.get();
  }

  function testWorldExists() public {
    uint256 codeSize;
    address addr = worldAddress;
    assembly {
      codeSize := extcodesize(addr)
    }
    assertTrue(codeSize > 0);
  }

  function testSimple() public {
    console.log("action period %d", env.actionPeriod);

    vm.startPrank(address(1));
    IWorld(worldAddress).forwarding_core_register();
    IWorld(worldAddress).forwarding_core_startGame();
    PlayerData memory data = Player.get(address(1));
    console.log("level %d", data.level);
    console.log("value %d", data.value);
    console.log("left %x", data.left);
    console.log("right %x", data.right);
    console.log("next left %x", data.nextLeft);
    console.log("next right %x", data.nextRight);
    console.log("robber %x", data.robber);

    IWorld(worldAddress).forwarding_core_passThrough(data.left > 65536 ? false : true);
    data = Player.get(address(1));
    console.log("level %d", data.level);
    console.log("value %d", data.value);
    console.log("left %x", data.left);
    console.log("right %x", data.right);
    console.log("next left %x", data.nextLeft);
    console.log("next right %x", data.nextRight);
    console.log("robber %x", data.robber);
    vm.stopPrank();
  }

  function testSkipBattleRevert() public {
    startPrankDeployer();
    Player.set(address(1), PlayerData({
      level: env.robberRate,
      value: 100,
      left: 1,
      right: 1,
      nextLeft: 1,
      nextRight: 1,
      robber: 10,
      lastUpdate: uint64(block.number)
    }));
    vm.stopPrank();

    vm.startPrank(address(1));
    vm.expectRevert("beat the robber");
    IWorld(worldAddress).forwarding_core_passThrough(true);
    vm.stopPrank();
  }

  function testSnatchScore_player() public {
    startPrankDeployer();
    PlayerInfo.set(address(1), 1);
    PlayerInfo.set(address(2), 2);
    Player.set(address(1), PlayerData({
      level: env.robberRate,
      value: 100,
      left: 1,
      right: 1,
      nextLeft: 1,
      nextRight: 1,
      robber: (2 << 16) + 10,
      lastUpdate: uint64(block.number)
    }));
    Record.setScore(1, 1);
    Record.setScore(2, 1);
    vm.stopPrank();

    vm.startPrank(address(1));
    IWorld(worldAddress).forwarding_core_battle();
    assertEq(Record.getScore(1), 2);
    assertEq(Record.getScore(2), 0);
    assertEq(Player.getValue(address(1)), 90);
    vm.stopPrank();
  }

  function testSnatchScore_robber() public {
    startPrankDeployer();
    PlayerInfo.set(address(1), 1);
    PlayerInfo.set(address(2), 2);
    Player.set(address(1), PlayerData({
      level: env.robberRate,
      value: 10,
      left: 1,
      right: 1,
      nextLeft: 1,
      nextRight: 1,
      robber: (2 << 16) + 100,
      lastUpdate: uint64(block.number)
    }));
    Record.setScore(1, 1);
    Record.setScore(2, 1);
    vm.stopPrank();

    vm.startPrank(address(1));
    IWorld(worldAddress).forwarding_core_battle();
    assertEq(Record.getScore(1), 0);
    assertEq(Record.getScore(2), 2);
    assertEq(Player.getValue(address(1)), 0);
    assertEq(Player.getLastUpdate(address(1)), 0);
    vm.stopPrank();
  }

  function startPrankDeployer() internal {
    vm.startPrank(vm.addr(vm.envUint("PRIVATE_KEY")));
  }
}
