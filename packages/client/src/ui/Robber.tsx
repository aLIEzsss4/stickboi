import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "../MUDContext";
import { renderCharacters } from "./Army";
import { useHotkeys } from "react-hotkeys-hook";
import useAppStore from "../utils/zustand";

export function Robber() {
  const {
    components: { Player },
    network: { playerEntity },
    systemCalls: { battle },
  } = useMUD();

  const enableBtn = useAppStore((state) => state.enableBtn);
  const setEnableBtn = useAppStore((state) => state.setEnableBtn);

  const battleFn = () => {
    setEnableBtn(false);
    battle().finally(() => {
      setEnableBtn(true);
    });
  };

  // binding hotkeys
  useHotkeys(["ArrowUp", "W"], () => battleFn(), [battleFn]);

  const playerData = useComponentValue(Player, playerEntity);
  return (
    <div className="flex flex-col items-center m-4">
      <div className="m-4">{playerData?.robber}</div>
      {renderCharacters(playerData?.robber || 0)}
      {enableBtn ? (
        <div className="btn btn-active m-4" onClick={battleFn}>
          Battle
        </div>
      ) : (
        <div className="btn btn-disabled m-4" onClick={battleFn}>
          Battle
        </div>
      )}
    </div>
  );
}
