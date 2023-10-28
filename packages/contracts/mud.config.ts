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
        playerNumber: "uint16",
        actionPeriod: "uint16",
        initialValue: "uint16"
      },
    },
    Player: {
      keySchema: {
        addr: "address",
      },
      valueSchema: {
        uuid: "uint16",
        level: "uint16",
        value: "uint16",
        left: "uint24",
        right: "uint24",
        nextLeft: "uint24",
        nextRight: "uint24",
        robber: "uint16",
        highestValue: "uint16",
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
