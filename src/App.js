import { useEffect, useState } from "react";

import { useScrollBodyLock } from "./hooks/useScrollBodyLock";
import { tips } from "./tips";
import { TestPage } from "./components/TestPage";
import "./App.css";

function App() {
  const tipsFromStorage = localStorage.getItem("tips");
  const timer = Math.floor(Math.random() * (30000 - 12000 + 1000)) + 12000;
  const [showDialog, setShowDialog] = useState(true);
  const { lock, unlock } = useScrollBodyLock();

  useEffect(() => {
    if (!tipsFromStorage) {
      localStorage.setItem("tips", JSON.stringify([]));
    }
  }, [tipsFromStorage]);

  useEffect(() => {
    setTimeout(() => {
      setShowDialog(false);
    }, timer);
  }, []);

  useEffect(() => {
    if (showDialog) {
      lock();
    } else {
      unlock();
    }
  }, [showDialog]);

  const getTips = () => {
    if (tipsFromStorage && JSON.parse(tipsFromStorage).length > 0) {
      return JSON.parse(tipsFromStorage);
    }
    return tips;
  };

  return (
    <div className="App">
      <TestPage showDialog={showDialog} informationTips={getTips()} />
    </div>
  );
}

export default App;
