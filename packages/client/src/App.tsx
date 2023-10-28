import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import MainPage from "./ui";
import "./index.css";

export const App = () => {
  const {
    components: {},
    systemCalls: {},
  } = useMUD();

  return (
    <>
      <MainPage />
    </>
  );
};
