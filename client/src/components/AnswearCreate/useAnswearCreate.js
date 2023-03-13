import { useEffect, useState } from "react";

const useAnswearCreate = (
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

    if (currentText.length < 5 || currentText.length > 30) {
      textErrorMessage =
        "Question text must be between 5 and 30 characters long.";
    }
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

export default useAnswearCreate;
