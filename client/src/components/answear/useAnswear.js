import { useEffect, useState } from "react";

const useAnswear = (
  clientId,
  defaultText,
  defaultIsCorrect,
  handleAnswearOnChange
) => {
  const [text, setText] = useState(defaultText);
  const [isCorrect, setIsCorrect] = useState(defaultIsCorrect);
  const [errors, setErrors] = useState({
    text: "",
  });

  const handleTextChange = (event) => {
    event.preventDefault();
    const currentText = event.target.value;
    let textErrorMessage = "";

    if (currentText.length === "")
      textErrorMessage = "Answear text is required.";

    setErrors((oldErrors) => ({
      ...oldErrors,
      text: textErrorMessage,
    }));

    setText(currentText);
  };

  const handleIsCorrectChange = () => {
    setIsCorrect((oldState) => !oldState);
  };

  useEffect(() => {
    handleAnswearOnChange({ id: clientId, text, isCorrect });
  }, [text, isCorrect]);

  return { text, handleTextChange, isCorrect, handleIsCorrectChange, errors };
};

export default useAnswear;
