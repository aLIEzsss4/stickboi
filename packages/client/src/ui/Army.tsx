import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "../MUDContext";
import { valueToCharArray } from "../utils";
import { useHotkeys } from "react-hotkeys-hook";
import useAppStore from "../utils/zustand";

const Arrow = ({
  enable,
  content,
  onClick,
}: {
  enable: boolean;
  content: string;
  onClick: () => Promise<void>;
}) => {
  // TODO: click to select the left door or the right door
  return (
    <div className="w-20 m-16" onClick={onClick}>
      {enable ? (
        <div className="whitespace-nowrap w-24 btn btn-active">{content}</div>
      ) : (
        <div className="whitespace-nowrap w-24 btn btn-disabled">{content}</div>
      )}
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
      className={`flex flex-row flex-wrap items-center justify-center w-${boxWidth} h-32 bg-gray-200 mb-4`}
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

export const Army = ({ hasRobber }: { hasRobber: boolean }) => {
  const {
    components: { Player },
    network: { playerEntity },
    systemCalls: { passLeftDoor, passRightDoor },
  } = useMUD();

  const enableBtn = useAppStore((state) => state.enableBtn);
  const setEnableBtn = useAppStore((state) => state.setEnableBtn);

  const passLeftDoorFn = async () => {
    setEnableBtn(false);
    passLeftDoor().finally(() => {
      setEnableBtn(true);
    });
  };

  const passRightDoorFn = async () => {
    setEnableBtn(false);
    passRightDoor().finally(() => {
      setEnableBtn(true);
    });
  };

  const value = useComponentValue(Player, playerEntity)?.value || 0;

  // binding hot key
  useHotkeys(["A", "ArrowLeft"], () => passLeftDoorFn(), [passLeftDoorFn]);
  useHotkeys(["D", "ArrowRight"], () => passRightDoorFn(), [passRightDoorFn]);

  return (
    <div>
      <div className="flex items-center flex-row">
        <Arrow
          enable={enableBtn && !hasRobber}
          content="Move Left"
          onClick={passLeftDoorFn}
        />
        <div className="flex flex-col items-center">
          <div className="my-2 font-mono">{value}</div>
          {renderCharacters(value)}
        </div>
        <Arrow
          enable={enableBtn && !hasRobber}
          content="Move Right"
          onClick={passRightDoorFn}
        />
      </div>
    </div>
  );
};
