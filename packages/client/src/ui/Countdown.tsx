import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "../MUDContext";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { useEffect, useState } from "react";

const timePerBlock: { [x: number]: number } = { 31_337: 1, 1398383: 0.5 };

function usePassedBlock() {
  const {
    components: { Player },
    network: { playerEntity, latestBlock$ },
  } = useMUD();
  const [remainBlockNumber, setRemainBlockNumber] = useState(0);
  const lastUpdate = useComponentValue(Player, playerEntity)?.lastUpdate || 0n;

  useEffect(() => {
    const subscription = latestBlock$.subscribe({
      next(value) {
        if (value.number) {
          setRemainBlockNumber(Number(value.number - lastUpdate));
        }
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [lastUpdate, latestBlock$]);

  return remainBlockNumber;
}

export function useRemainingSeconds() {
  const {
    components: { GameEnv },
    network: { publicClient },
  } = useMUD();

  const maxPeriod =
    useComponentValue(GameEnv, singletonEntity)?.actionPeriod || 0;
  const passedBlockNumber = usePassedBlock();
  const chainId = publicClient.chain.id;

  const remainingSeconds = Math.max(
    timePerBlock[chainId] * (maxPeriod - passedBlockNumber),
    0
  );

  return { data: remainingSeconds };
}

export function Countdown() {
  const { data: remainingSeconds } = useRemainingSeconds();

  return (
    <div>
      <div className="m-8">Responds in {remainingSeconds} second</div>
    </div>
  );
}
