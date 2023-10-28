import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "forwarding",
  systems: {
    CoreSystem: {
      name: "core",
      openAccess: true,
    },
  },
  tables: {
    GameEnv: {
      keySchema: {},
      valueSchema: {
        // global player numbers who has registered
        playerNumber: "uint16",
        // during how many blocks the player should make his decision for each level
        actionPeriod: "uint16",
        // player's initial value 
        initialValue: "uint16",
        // every how many levels there will be a robber
        robberRate: "uint16",
        // how many levels does one game have
        levelNumber: "uint16",
      },
    },
    PlayerInfo: {
      keySchema: {
        addr: "address",
      },
      valueSchema: {
        uuid: "uint16",
      },
    },
    Player: {
      keySchema: {
        addr: "address",
      },
      valueSchema: {
        level: "uint16",
        value: "uint16",
        // encoding rule: left = uint8 operation | uint16 left_result
        // operation set = {+, - * /}, where 0 means +, 3 means /
        // if the player pass through the left gear, then his value will be updated to left_result
        left: "uint24",
        right: "uint24",
        nextLeft: "uint24",
        nextRight: "uint24",
        robber: "uint32",
        lastUpdate: "uint64",
      },
    },
    Record: {
      keySchema: {
        uuid: "uint32",
      },
      valueSchema: {
        addr: "address",
        highestValue: "uint16",
        score: "uint64",
      },
    }
  },
});
