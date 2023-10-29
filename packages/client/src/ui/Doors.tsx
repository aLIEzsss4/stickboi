import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "../MUDContext";
import { decodeDoorContent } from "../utils";
import { hexToBigInt, keccak256, maxUint248, toHex } from "viem";

const Door = ({ content }: { content: string }) => (
  <div className="h-32 w-48 bg-gradient-to-r from-gray-200 to-gray-400 shadow-lg mx-8 m-4 flex items-center justify-center">
    <div className="text-black">{content}</div>
  </div>
);

export const Doors = () => {
  const {
    components: { Player },
    network: { playerEntity },
  } = useMUD();

  const playData = useComponentValue(Player, playerEntity);

  const lastUpdate = playData?.lastUpdate || 0;

  // use a deterministic random number to confirm same display for each react rerender
  const r =
    Number(hexToBigInt(keccak256(toHex(lastUpdate))) / maxUint248) / 256;

  return (
    <div>
      <div className="flex justify-center items-center mb-16">
        <Door content={decodeDoorContent(r, playData?.value, playData?.left)} />
        <Door
          content={decodeDoorContent(r, playData?.value, playData?.right)}
        />
      </div>
    </div>
  );
};
