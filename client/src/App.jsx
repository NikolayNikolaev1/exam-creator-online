import { Route, Routes } from "react-router-dom";
import "./App.css";
import AnswearForm from "./components/answear/";
import ExamCreate from "./components/exam/create-form";
import ExamDetails from "./components/exam/details";
import ExamEdit from "./components/exam/edit-form";
import Login from "./components/auth/login";
import QuestionCreate from "./components/question/create-form/index.jsx";
import QuestionEdit from "./components/question/edit-form";
import FacilityOwner from "./components/auth/facility-owner";
import Register from "./components/auth/register";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/navbar";
import FacilityEdit from "./components/facility/edit";
import { FacilityProvider } from "./contexts/FacilityContext";
import Home from "./components/home";
import ProfileEdit from "./components/profile/edit";

const App = () => (
  <AuthProvider>
    <FacilityProvider>
      <header className="App-header">
        <Navbar />
      </header>
      <main className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/facility/create" element={<FacilityOwner />} />
          <Route path="/facility/:facilityId/edit" element={<FacilityEdit />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
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
            element={<AnswearForm />}
          />
        </Routes>

        <footer>
          <div className="floating-text">
            Part of{" "}
            <a
              href="https://florin-pop.com/blog/2019/09/100-days-100-projects"
              target="_blank"
            >
              #100Days100Projects
            </a>
          </div>
          <button className="floating-btn">Get in Touch</button>
        </footer>
      </main>
    </FacilityProvider>
  </AuthProvider>
);

export default App;
