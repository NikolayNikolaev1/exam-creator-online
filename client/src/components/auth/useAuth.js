import { useState } from "react";

const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    event.preventDefault();
    const currentEmail = event.target.value;


    setEmail(currentEmail);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    const currentPassword = event.target.value;

    setPassword(currentPassword);
  };

  return {
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
  };
};

export default useAuth;
