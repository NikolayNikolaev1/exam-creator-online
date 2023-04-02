import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useFacilityContext } from "../../../contexts/FacilityContext";
import { addStudents, removeStudents } from "../../../services/examService";
import { deleteQuestion } from "../../../services/questionService";

const useExamDetails = (examId) => {
  const { auth } = useAuthContext();
  const { facility, setFacility } = useFacilityContext();
  const { exams, members } = facility;
  const [exam, setExam] = useState({ questions: [] });
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showAddStudents, setShowAddStudents] = useState(false);
  const [showRemoveStudents, setShowRemoveStudents] = useState(false);
  const navigate = useNavigate();

  const handleSelectedStudentsOnChange = (event, students) => {
    event.preventDefault();
    setSelectedStudents(students);
  };

  const addStudentsOnClick = async (event) => {
    event.preventDefault();

    await addStudents(examId, {
      studentIds: selectedStudents,
      lecturerId: auth.id,
    });
  };

  const removeStudentsOnClick = async (event) => {
    event.preventDefault();

    await removeStudents(examId, {
      studentIds: selectedStudents,
      lecturerId: auth.id,
    });
  };

  const handleQuestionDeleteOnClick = async (event, questionId) => {
    event.preventDefault();

    await deleteQuestion(questionId).then(() =>
      setExam((oldExam) => ({
        ...oldExam,
        questions: oldExam.questions.filter((q) => q.id !== questionId),
      }))
    );
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
      });

      return;
    }

    if (showRemoveStudents) {
      await removeStudents(examId, {
        studentIds: selectedStudents.map((s) => s.id),
        lecturerId: auth.id,
      });
    }
  };

  useEffect(() => {
    if (auth.facilityId !== facility.id) navigate("/");
    setExam(exams?.filter((e) => e.id == examId)[0]);
  }, [examId]);

  return {
    exam,
    members,
    selectedStudents,
    showAddStudents,
    handleAddStudentOnClick,
    showRemoveStudents,
    handleRemoveStudentOnClick,
    handleStudentsSaveOnClick,
    handleSelectedStudentsOnChange,
    // addStudentsOnClick,
    // removeStudentsOnClick,
    handleQuestionDeleteOnClick,
  };
};

export default useExamDetails;
