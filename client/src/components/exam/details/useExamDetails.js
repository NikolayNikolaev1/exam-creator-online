import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useFacilityContext } from "../../../contexts/FacilityContext";
import {
  addStudents,
  deleteExam,
  removeStudents,
} from "../../../services/examService";
import { deleteQuestion } from "../../../services/questionService";

const useExamDetails = (examId) => {
  const { auth } = useAuthContext();
  const { facility, setFacility } = useFacilityContext();
  const [exam, setExam] = useState({ questions: [] });
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showAddStudents, setShowAddStudents] = useState(false);
  const [showRemoveStudents, setShowRemoveStudents] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSelectedStudentsOnChange = (event, students) => {
    event.preventDefault();
    setSelectedStudents(students);
  };

  const handleQuestionDeleteOnClick = async (event, questionId) => {
    event.preventDefault();

    await deleteQuestion(questionId).then(() => {
      setExam((oldExam) => ({
        ...oldExam,
        questions: oldExam.questions.filter((q) => q.id !== questionId),
      }));
    });
  };

  const handleAddStudentOnClick = (event) => {
    event.preventDefault();
    setSelectedStudents([]);
    setShowAddStudents((oldState) => !oldState);
    setShowRemoveStudents(false);
  };

  const handleRemoveStudentOnClick = (event) => {
    event.preventDefault();
    setSelectedStudents([]);
    setShowRemoveStudents((oldState) => !oldState);
    setShowAddStudents(false);
  };

  const handleStudentsSaveOnClick = async (event) => {
    event.preventDefault();

    if (showAddStudents) {
      await addStudents(examId, {
        studentIds: selectedStudents.map((s) => s.id),
        lecturerId: auth.id,
      }).then((studentIdsData) => {
        setExam((oldExam) => ({
          ...oldExam,
          studentIds: studentIdsData,
        }));
      });

      setShowAddStudents(false);
    } else {
      await removeStudents(examId, {
        studentIds: selectedStudents.map((s) => s.id),
        lecturerId: auth.id,
      }).then((studentIdsData) => {
        setExam((oldExam) => ({
          ...oldExam,
          studentIds: studentIdsData,
        }));
      });

      setShowRemoveStudents(false);
    }

    setSelectedStudents([]);
  };

  const handleExamDeleteOnClick = async (event) => {
    event.preventDefault();

    await deleteExam(examId)
      .then(() => {
        setFacility((oldFacility) => ({
          ...oldFacility,
          exams: oldFacility.exams.filter((e) => e.id != examId),
        }));

        navigate("/");
      })
      .catch(() =>
        setErrorMessage("Please remove all students before deleting the exam.")
      );
  };

  useEffect(() => {
    if (auth.facilityId !== facility.id) navigate("/");
    setExam(facility.exams.find((e) => e.id == examId));
  }, [examId]);

  useEffect(() => {
    // Update after student change.
    if (typeof exam.id === "undefined") return;
    setFacility((oldFacility) => ({
      ...oldFacility,
      exams: oldFacility.exams.map((e) => (e.id == examId ? exam : e)),
    }));
  }, [exam]);

  return {
    exam,
    selectedStudents,
    showAddStudents,
    handleAddStudentOnClick,
    showRemoveStudents,
    handleRemoveStudentOnClick,
    handleStudentsSaveOnClick,
    handleSelectedStudentsOnChange,
    handleQuestionDeleteOnClick,
    handleExamDeleteOnClick,
    errorMessage,
  };
};

export default useExamDetails;
