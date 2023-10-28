import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "../MUDContext";
import { decodeDoorContent } from "../utils";

const Door = ({ content }: { content: string }) => (
  <div className="h-32 w-48 bg-gradient-to-r from-gray-200 to-gray-400 shadow-lg mx-8 m-4 flex items-center justify-center">
    <div>{content}</div>
  </div>
);

const Doors = () => {
  const {
    components: { Player },
    network: { playerEntity },
  } = useMUD();

  const playData = useComponentValue(Player, playerEntity);

  return (
    <div>
      <div className="flex justify-center items-center mb-16">
        <Door content={decodeDoorContent(playData?.value, playData?.left)} />
        <Door content={decodeDoorContent(playData?.value, playData?.right)} />
      </div>
    </div>
  );
};

export { Doors };
