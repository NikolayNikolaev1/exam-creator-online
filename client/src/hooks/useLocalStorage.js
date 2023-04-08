import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    const persistedStateSerialized = localStorage.getItem(key);

    if (persistedStateSerialized) return JSON.parse(persistedStateSerialized);

    return initialValue;
  });

  const setLocalStorageState = (value) => {
    setState(value);
  };

  useEffect(() => {
    if (typeof state === "undefined") return;

    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setLocalStorageState];
};

export default useLocalStorage;
