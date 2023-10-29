import { useComponentValue } from "@latticexyz/react";
import { useState } from "react";
import { useMUD } from "../MUDContext";
import { valueToCharArray } from "../utils";
import { useHotkeys } from "react-hotkeys-hook";

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

// max three row, 6 image per row
export const renderCharacters = (value: number) => {
  const boxWidth = 48;

  const charArray = valueToCharArray(value);
  const charCount = charArray.length;

  const imagesPerRow = Math.min(6, charCount);

  const imageWidth = Math.min(
    boxWidth / imagesPerRow - ((boxWidth / imagesPerRow) % 2),
    20
  );

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

export const Army = () => {
  const {
    components: { Player },
    network: { playerEntity },
    systemCalls: { passLeftDoor, passRightDoor },
  } = useMUD();

  const value = useComponentValue(Player, playerEntity)?.value || 0;

  // binding hot key
  useHotkeys(["A", "ArrowLeft"], () => passLeftDoor(), [passLeftDoor]);
  useHotkeys(["D","ArrowRight"], () => passRightDoor(), [passRightDoor]);

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
          {renderCharacters(value)}
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
