import { tips } from "./tips";

export const getRandomValueFromArray = (array: string[]) => {
  let copy = array.slice(0);
  return function () {
    if (copy.length < 1) {
      copy = array.slice(0);
    }
    const index = Math.floor(Math.random() * copy.length);
    const item = copy[index];
    copy.splice(index, 1);
    return item;
  };
};

export const getTips = () => {
  const tipsFromStorage = localStorage.getItem("tips");
  if (tipsFromStorage) {
    const myArray = JSON.parse(tipsFromStorage);
    return tips.filter(function (tip) {
      return myArray.indexOf(tip) === -1;
    });
  }
  return tips;
};

export const makeUniqueRandom = () => {
  const tipsFromStorage = localStorage.getItem("tips");

  if (tipsFromStorage) {
    if (JSON.parse(tipsFromStorage).length > 0) {
      return getRandomValueFromArray(JSON.parse(tipsFromStorage));
    }

    const randomValue = tips[Math.floor(Math.random() * tips.length)];
    const clone = [...tips];
    const index = clone.indexOf(randomValue);
    if (index > -1) {
      clone.splice(index, 1);
      localStorage.setItem("tips", JSON.stringify(clone));
    }
    return randomValue;
  }

  return "";
};
