import { useMUD } from "../MUDContext";
import { useComponentValue } from "@latticexyz/react";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { decodeDoorContent } from "../utils";
import { useEffect, } from "react";
import { hexToBigInt, keccak256, maxUint248, toHex } from "viem";
import useAppStore from "../utils/zustand";

export function usePlugin() {
  const {
    components: { Player, PlayerInfo, GameEnv },
    network: { playerEntity },
    systemCalls: { passLeftDoor, passRightDoor, battle },
  } = useMUD();

  const { pluginActive, setPluginActive } = useAppStore();

  const playData = useComponentValue(Player, playerEntity);
  const gameConfig = useComponentValue(GameEnv, singletonEntity);

  const lastUpdate = playData?.lastUpdate || 0;

  const r =
    Number(hexToBigInt(keccak256(toHex(lastUpdate))) / maxUint248) / 256;

  const hasRobber: boolean =
    playData?.level % gameConfig?.robberRate === 0 && playData?.robber !== 0;

  const x = playData?.value;

  const calcNum = () => {
    if (playData?.value && playData?.left && playData?.right) {
      const left = decodeDoorContent(r, playData?.value, playData?.left);
      const right = decodeDoorContent(r, playData?.value, playData?.right);

      const leftNum = eval(left);
      const rightNum = eval(right);

      if (leftNum > rightNum) {
        passLeftDoor();
      } else if (leftNum <= rightNum) {
        passRightDoor();
      }
    }
  };

  useEffect(() => {
    if (pluginActive) {
      if (hasRobber) {
        battle();
      } else {
        calcNum();
      }
    }

    return () => {};
  }, [pluginActive, r, hasRobber]);

  return {
    setPluginActive,
    pluginActive,
  };
}
