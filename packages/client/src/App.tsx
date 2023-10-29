import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import MainPage from "./ui";
import "./index.css";
import { HotkeysProvider } from "react-hotkeys-hook";

export const App = () => {
  return (
    <HotkeysProvider initiallyActiveScopes={['settings']}>
      <MainPage />
    </HotkeysProvider>
  );
};
