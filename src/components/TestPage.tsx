import React, { FC, useState, useEffect } from "react";
import { Fade } from "@mui/material";

import { CustomDialog } from "./customDialog/CustomDialog";
import { tips } from "../tips";
import { makeUniqueRandom } from "../utils";
import "../App.css";

interface Props {
  showDialog: boolean;
  informationTips: string[];
}

export const TestPage: FC<Props> = ({ showDialog, informationTips }) => {
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [infoTips, setInfoTips] = useState<string[]>([]);
  const [isTipsShown, setIsTipsShown] = useState<boolean>(false);
  const [tipToShow, setTipToShow] = useState<string>("");

  useEffect(() => {
    setInfoTips(informationTips);
  }, [informationTips]);

  useEffect(() => {
    if (infoTips.length === 0 && tipToShow !== "") {
      setInfoTips(tips);
    }
    const copy = [...infoTips];
    if (copy.length !== 0) {
      const index = copy.indexOf(tipToShow);
      if (index > -1) {
        copy.splice(index, 1);
      }
      setInfoTips(copy);
      localStorage.setItem("tips", JSON.stringify(copy));
    }
  }, [tipToShow]);

  const changeTip = () => {
    setTipToShow(makeUniqueRandom());
  };

  useEffect(() => {
    if (!showDialog) {
      setIsTipsShown(false);
    }
  }, [showDialog]);

  useEffect(() => {
    if (isTipsShown) {
      setTipToShow(infoTips[0]);
      const intervalId = setInterval(changeTip, 3000);
      // @ts-ignore
      setIntervalId(intervalId);
    }

    if (!isTipsShown) {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [isTipsShown]);

  const handleShowTips = () => {
    setIsTipsShown((prev) => !prev);
  };

  return (
    <>
      <div className="screenOne">screen 1</div>
      <div className="screenTwo">screen 2</div>
      <Fade in={showDialog}>
        <div>
          <CustomDialog
            handleShowTips={handleShowTips}
            tip={tipToShow}
            isTipsShown={isTipsShown}
          />
        </div>
      </Fade>
    </>
  );
};
