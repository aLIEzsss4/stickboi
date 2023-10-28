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
        // encoding rule: left = uint8 operation | uint16 change
        // change is a randomNumber in the range [1, levelNumber * 10]
        // operation set = {+, - }, where 0 means +, 1 means -
        // front-end could decide how to express this gear in his choice. 
        // for example, if it's a gear of + 100, the current value of player is 50.
        // then this gear could be "X * 3" or "X / (1/3)" or "X + 100" or "X - (-100)"
        left: "uint24",
        right: "uint24",
        nextLeft: "uint24",
        nextRight: "uint24",
        // encodeing rule: robber = uint16 robberUuid | uint16 robberValue
        // if there is more than 10 players then
        // robberUuid is randomly chosen from all players 
        // robberValue = (highestValue of robberUuid) * level^2 / maxLevel^2
        // if not, robberValue = random(1, level^2)
        // battle rule: if playerValue > robberValue, then playerValue -= robberValue, playerScore++, robberScore--.
        // if else, game ends, playerScore++, robberScore--.
        // if the robber and the player are the same one, then playerValue += robberValue
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
