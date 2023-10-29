import { useEffect } from "react";
import useStore from "../utils/zustand";
import { useRemainingSeconds } from "../ui/Countdown";
import { useLocalStorage } from "react-use";
import { useMUD } from "../MUDContext";
import { useComponentValue } from "@latticexyz/react";

export function useDeadAlert() {
  const {
    components: { Player },
    network: { playerEntity },
  } = useMUD();

  const playerData = useComponentValue(Player, playerEntity);
  const lastUpdate = playerData?.lastUpdate
    ? Number(playerData?.lastUpdate)
    : 0;

  const setShow = useStore((state) => state.setShowAlert);
  const setInfo = useStore((state) => state.setAlertInfo);
  const [alerted, setAlerted] = useLocalStorage<{ [x: number]: boolean }>(
    "record-alerted",
    {}
  );

  const { data: remainingSeconds } = useRemainingSeconds();

  useEffect(() => {
    if (remainingSeconds === 0 && !alerted?.[lastUpdate]) {
      setShow(true);
      setInfo("You died");
      if (alerted) {
        alerted[lastUpdate] = true;
        setAlerted(alerted);
      }
    }
  }, [remainingSeconds, setShow, setInfo, alerted]);
}
