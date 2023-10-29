import { useMUD } from "../MUDContext";

export const MockButtons = () => {
  const {
    systemCalls: { register, startGame },
  } = useMUD();
  return (
    <div className="flex items-center flex-row">
      <div className="btn btn-active m-4" onClick={register}>
        Register
      </div>
      <div className="btn btn-active m-4" onClick={startGame}>
        StartGame
      </div>
    </div>
  );
};
