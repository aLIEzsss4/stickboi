// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { IWorld } from "../src/codegen/world/IWorld.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { GameEnv, GameEnvData, Player, PlayerData, Record, RecordData } from "../src/codegen/index.sol";

contract PostDeploy is Script {
  function run(address worldAddress) external {
    // Load the private key from the `PRIVATE_KEY` environment variable (in .env)
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

    // Start broadcasting transactions from the deployer account
    vm.startBroadcast(deployerPrivateKey);

    StoreSwitch.setStoreAddress(worldAddress);

    // configuration
    // set time window for each action to 5 blocks
    GameEnv.setActionPeriod(5);
    // player starts the game from 1
    GameEnv.setInitialValue(1);
    // every 5 levels, there will be a robber
    GameEnv.setRobberRate(5);
    // there will be at most 100 levels in one game
    GameEnv.setLevelNumber(100);

    vm.stopBroadcast();
  }
}
