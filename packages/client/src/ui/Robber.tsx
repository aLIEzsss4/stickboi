import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "../MUDContext";
import { renderCharacters } from "./Army";

export function Robber() {
  const {
    components: { Player },
    network: { playerEntity },
    systemCalls: { battle },
  } = useMUD();

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
