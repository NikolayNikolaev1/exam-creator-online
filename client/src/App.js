// import { useEffect } from "react";
// import "./App.css";
import { Route, Routes } from "react-router-dom";
import AnswearCreate from "./components/AnswearCreate";
import ExamCreate from "./components/exam/create-form";
import ExamDetails from "./components/exam/details";
import ExamEdit from "./components/exam/edit-form";
import Login from "./components/auth/login";
import QuestionCreate from "./components/question/create-form/index.jsx";
import QuestionEdit from "./components/question/edit-form";
import FacilityOwner from "./components/auth/facility-owner";
import Register from "./components/auth/register";
// import { getExamList } from "./services/apiClient";

function App() {
  // useEffect(() => {
  //   getExamList();
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/facility/create" element={<FacilityOwner />} />
          <Route path="/exam/create" element={<ExamCreate />} />
          <Route path="/exam/:examId" element={<ExamDetails />} />
          <Route path="/exam/:examId/edit" element={<ExamEdit />} />
          <Route
            path="/exam/:examId/question/create"
            element={<QuestionCreate />}
          />
          <Route
            path="/exam/:examId/question/:questionId/edit"
            element={<QuestionEdit />}
          />
          <Route
            path="/exam/:examId/question/:questionId/answear/create"
            element={<AnswearCreate />}
          />
        </Routes>
      </header>
      {/* <QuestionCreate /> */}
    </div>
  );
}

export default App;
