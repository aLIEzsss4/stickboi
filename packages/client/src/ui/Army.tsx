import { useComponentValue } from "@latticexyz/react";
import { useState } from "react";
import { useMUD } from "../MUDContext";
import { valueToCharArray } from "../utils";

const Arrow = ({
  src,
  content,
  onClick,
}: {
  src: string;
  content: string;
  onClick: () => void;
}) => {
  // TODO: click to select the left door or the right door
  return (
    <div className="w-20 m-16" onClick={onClick}>
      {/* <img src={src} alt={content} /> */}
      <div className="whitespace-nowrap w-24 btn btn-active"> {content}</div>
    </div>
  );
};

export const Army = () => {
  const {
    components: { Player },
    network: { playerEntity },
    systemCalls: { passLeftDoor, passRightDoor },
  } = useMUD();

  const value = useComponentValue(Player, playerEntity)?.value || 0;
  const [selectedDoor, setSelectedDoor] = useState("");

  const handleSelectDoor = (door: string) => {
    setSelectedDoor(door);
    // Handle door selection logic here
  };

  // max three row, 6 image per row
  const renderCharacters = () => {
    const boxWidth = 48; // 定义你的box宽度

    const charArray = valueToCharArray(value);
    const charCount = charArray.length;

    const imagesPerRow = Math.min(6, charCount);

    const imageWidth = Math.min(
      boxWidth / imagesPerRow - ((boxWidth / imagesPerRow) % 2),
      20
    );

    console.log("imageWidth: ", imageWidth, boxWidth, imagesPerRow);

    return (
      <div
        className={`flex flex-row flex-wrap items-center justify-center w-${boxWidth} h-32 bg-gray-200`}
        style={{ width: `${boxWidth / 4}rem` }}
      >
        {charArray.map((v, i) => {
          return (
            <img
              key={i}
              src={`./assets/${v}.png`}
              alt={v}
              className={`rounded-full h-auto transform hover:scale-125 transition duration-200`}
              style={{ width: `${imageWidth / 4}rem` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center flex-row">
        <Arrow
          src={"./assets/arrow_left.png"}
          content="Move Left"
          onClick={passLeftDoor}
        />
        <div className="flex flex-col items-center">
          <div className="my-2 font-mono">{value}</div>
          {renderCharacters()}
        </div>
        <Arrow
          src={"./assets/arrow_right.png"}
          content="Move Right"
          onClick={passRightDoor}
        />
      </div>
    </div>
  );
};
