import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./Form.css";
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
import RouteGuard from "./components/common/RouteGuard";
import NotFound from "./components/not-found";
import ErrorBoundary from "./components/common/ErrorBoundary";

const App = () => (
  <AuthProvider>
    <FacilityProvider>
      <header className="App-header">
        <Navbar />
      </header>
      <ErrorBoundary>
        <main className="App">
          <Routes>
            <Route
              path="/"
              element={
                <RouteGuard>
                  <Home />
                </RouteGuard>
              }
            />
            <Route
              path="/login"
              element={
                <RouteGuard role="Guest">
                  <Login />
                </RouteGuard>
              }
            />
            <Route
              path="/register"
              element={
                <RouteGuard role="Owner">
                  <Register />
                </RouteGuard>
              }
            />
            <Route
              path="/facility/create"
              element={
                <RouteGuard role="Admin">
                  <FacilityOwner />
                </RouteGuard>
              }
            />
            <Route
              path="/facility/:facilityId/edit"
              element={
                <RouteGuard role="Owner" resource="Facility">
                  <FacilityEdit />
                </RouteGuard>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <RouteGuard>
                  <ProfileEdit />
                </RouteGuard>
              }
            />
            <Route
              path="/exam/create"
              element={
                <RouteGuard role="Lecturer">
                  <ExamCreate />
                </RouteGuard>
              }
            />
            <Route
              path="/exam/:examId"
              element={
                <RouteGuard resource="Exam">
                  <ExamDetails />
                </RouteGuard>
              }
            />
            <Route
              path="/exam/:examId/edit"
              element={
                <RouteGuard role="Lecturer" resource="Exam">
                  <ExamEdit />
                </RouteGuard>
              }
            />
            <Route
              path="/exam/:examId/question/create"
              element={
                <RouteGuard role="Lecturer" resource="Exam">
                  <QuestionCreate />
                </RouteGuard>
              }
            />
            <Route
              path="/exam/:examId/question/:questionId/edit"
              element={
                <RouteGuard role="Lecturer" resource="Question">
                  <QuestionEdit />
                </RouteGuard>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <footer>
            <div className="floating-text">
              Part of{" "}
              <a href="https://github.com/NikolayNikolaev1/exam-creator-online">
                My Course Projects
              </a>
            </div>
            <a
              href="https://www.linkedin.com/in/nnikolaev-dev/"
              className="floating-btn"
            >
              Get in Touch
            </a>
          </footer>
        </main>
      </ErrorBoundary>
    </FacilityProvider>
  </AuthProvider>
);

export default App;
