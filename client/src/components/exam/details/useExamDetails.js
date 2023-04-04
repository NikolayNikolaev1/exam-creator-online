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
      }).then((response) =>
        setExam((oldExam) => ({
          ...oldExam,
          studentIds: response,
        }))
      );

      setShowAddStudents(false);
    } else {
      await removeStudents(examId, {
        studentIds: selectedStudents.map((s) => s.id),
        lecturerId: auth.id,
      }).then((response) => {
        setExam((oldExam) => ({
          ...oldExam,
          studentIds: response,
        }));
      });

      setShowRemoveStudents(false);
    }

    setSelectedStudents([]);
  };

  const handleExamDeleteOnClick = async (event) => {
    event.preventDefault();

    await deleteExam(examId).then(() => {
      setFacility((oldFacility) => ({
        ...oldFacility,
        exams: oldFacility.exams.filter((e) => e.id != examId),
      }));
      navigate("/");
    });
  };

  useEffect(() => {
    if (auth.facilityId !== facility.id) navigate("/");
    setExam(facility.exams.find((e) => e.id == examId));
  }, [examId]);

  useEffect(() => {
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
  };
};

export default useExamDetails;
