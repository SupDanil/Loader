export const useScrollBodyLock = () => {
  const lock = () => {
    const scrollY = `${window.scrollY}px`;
    const body = document.body;
    body.style.position = "fixed";
    body.style.width = "100%";
    body.style.top = `-${scrollY}`;
    return;
  };

  const unlock = () => {
    const body = document.body;
    const scrollY = body.style.top;
    const parsedScrollY = parseInt(scrollY || "0") * -1;

    body.style.position = "";
    body.style.top = "";

    if (parsedScrollY) {
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return;
  };

  return { lock, unlock };
};
