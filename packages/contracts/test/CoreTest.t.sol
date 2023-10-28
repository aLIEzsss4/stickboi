// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { getKeysWithValue } from "@latticexyz/world-modules/src/modules/keyswithvalue/getKeysWithValue.sol";

import { IWorld } from "../src/codegen/world/IWorld.sol";
import { GameEnv, GameEnvData, Player, PlayerData, Record, RecordData } from "../src/codegen/index.sol";

contract CoreTest is MudTest {
  function testWorldExists() public {
    uint256 codeSize;
    address addr = worldAddress;
    assembly {
      codeSize := extcodesize(addr)
    }
    assertTrue(codeSize > 0);
  }

  function testCore() public {
    GameEnvData memory env = GameEnv.get();
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
}
