import React, { FC } from "react";

import { Collapse } from "@mui/material";

import { Loader } from "../loader/Loader";
import "./dialog.css";

interface Props {
  tip: string;
  isTipsShown: boolean;
  handleShowTips: () => void;
}

export const CustomDialog: FC<Props> = ({
  tip,
  isTipsShown,
  handleShowTips,
}) => {
  return (
    <div className="dialog">
      <div className="header">
        <Loader />
        <div>Идет загрузка данных</div>
      </div>
      <div className="body">
        <div className="infoButton" onClick={handleShowTips}>
          {isTipsShown ? "-" : "+"}
        </div>
        <div>А вы знали?</div>
      </div>
      <Collapse in={isTipsShown}>
        <div className="tipsBox">{tip}</div>
      </Collapse>
    </div>
  );
};
