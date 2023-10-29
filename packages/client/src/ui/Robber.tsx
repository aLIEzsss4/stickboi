import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "../MUDContext";
import { renderCharacters } from "./Army";
import { useHotkeys } from "react-hotkeys-hook";

export function Robber() {
  const {
    components: { Player },
    network: { playerEntity },
    systemCalls: { battle },
  } = useMUD();

  // binding hotkeys
  useHotkeys(["ArrowUp", "W"], () => battle(), [battle]);

  const playerData = useComponentValue(Player, playerEntity);
  return (
    <div className="flex flex-col items-center m-4">
      <div className="m-4">{playerData?.robber}</div>
      {renderCharacters(playerData?.robber || 0)}
      <div className="btn btn-active m-4" onClick={battle}>
        Battle
      </div>
    </div>
  );
}
