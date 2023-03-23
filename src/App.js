import { Suspense } from "react";
import AutomaticBatching from "./components/AutomaticBatching";
import TestTransition from "./components/TestTransition";
import ShoeSkeleton from "./components/ShoeSkeleton";
import "./styles.css";

export default function App() {
  return (
    <div>
      <AutomaticBatching />
    </div>
  );
}
