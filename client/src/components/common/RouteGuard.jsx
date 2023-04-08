import { Fragment } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useFacilityContext } from "../../contexts/FacilityContext";

const RouteGuard = ({ children, role, resource }) => {
  const { examId, questionId } = useParams();
  const { auth } = useAuthContext();
  const { facility, facilityOwnerId } = useFacilityContext();

  if (role === "Guest") {
    if (typeof auth?.id !== "undefined") return <Navigate to="/" />;

    return <Fragment>{children}</Fragment>;
  }

  if (typeof auth.id === "undefined") return <Navigate to="/login" />;

  if (typeof role !== "undefined" && role !== auth.role) {
    return <Navigate to="/" />;
  }

  if (resource === "Facility" && auth.id !== facilityOwnerId) {
    return <Navigate to="/" />;
  }

  if (["Exam", "Question"].includes(resource)) {
    const currentExam = facility.exams.find((e) => e.id === +examId);

    if (typeof currentExam === "undefined") return <Navigate to="/404" />; // TODO: 404

    if (role === "Lecturer" && currentExam.lecturerId !== auth.id) {
      return <Navigate to="/" />;
    }

    if (resource === "Question") {
      if (
        typeof currentExam.questions.find((q) => q.id === +questionId) ===
        "undefined"
      ) {
        return <Navigate to="/404" />; // TODO: 404
      }
    }
  }

  return <Fragment>{children}</Fragment>;
};

export default RouteGuard;
