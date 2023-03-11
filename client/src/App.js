// import { useEffect } from "react";
// import "./App.css";
import { Route, Routes } from "react-router-dom";
import AnswearCreate from "./components/AnswearCreate";
import ExamCreate from "./components/ExamCreate";
import QuestionCreate from "./components/QuestionCreate.jsx";
// import { getExamList } from "./services/apiClient";

function App() {
  // useEffect(() => {
  //   getExamList();
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/login" element={<h1>Login</h1>} />
        </Routes>
      </header>
      <QuestionCreate />
    </div>
  );
}

export default App;
