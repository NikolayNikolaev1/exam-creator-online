import {
  Autocomplete,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteExam } from "../../../services/examService";
import useExamDetails from "./useExamDetails";
import CustomListItem from "../../list-item";
import { useFacilityContext } from "../../../contexts/FacilityContext";
import { Fragment } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";

const ExamDetails = () => {
  const { examId } = useParams();
  const { auth } = useAuthContext();
  const { facility } = useFacilityContext();
  const { members } = facility;
  const {
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
  } = useExamDetails(examId);

  return (
    <Container maxWidth="sm" sx={{ mb: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        {auth.id === exam.lecturerId && (
          <Fragment>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                component={Link}
                to={`/exam/${examId}/question/create`}
              >
                Add Questions
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                component={Link}
                to={`/exam/${examId}/edit`}
              >
                Edit
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={handleExamDeleteOnClick}
              >
                Delete
              </Button>
            </Grid>
          </Fragment>
        )}

        {errorMessage !== "" && <h2 className="error-msg">{errorMessage}</h2>}

        <Grid item xs={12}>
          <h1>{exam?.name}</h1>
        </Grid>

        <Grid item xs={12}>
          <p>{exam?.description}</p>
        </Grid>

        {auth.id === exam.lecturerId && (
          <Fragment>
            <List>
              {exam?.questions.map((q) => (
                <ListItem key={q.id}>
                  <CustomListItem
                    resource={"Question"}
                    header={q.text}
                    contentList={q.answears}
                    buttons={[
                      <Link to={`/exam/${examId}/question/${q.id}/edit`}>
                        <button className="btn-edit">Edit</button>
                      </Link>,
                      <Link
                        onClick={(e) => handleQuestionDeleteOnClick(e, q.id)}
                      >
                        <button className="btn">Delete</button>
                      </Link>,
                    ]}
                  />
                </ListItem>
              ))}
            </List>

            <Button
              sx={{ margin: "5px" }}
              variant="contained"
              onClick={handleAddStudentOnClick}
            >
              Add Student
            </Button>
            <Button
              sx={{ margin: "5px" }}
              variant="contained"
              onClick={handleRemoveStudentOnClick}
            >
              Remove Student
            </Button>

            {showAddStudents && (
              <Autocomplete
                multiple
                value={selectedStudents}
                onChange={(event, newValue) =>
                  handleSelectedStudentsOnChange(event, newValue)
                }
                getOptionLabel={(option) => option.email}
                id="controllable-states-demo"
                options={members?.filter(
                  (m) => !exam.studentIds.includes(m.id) && m.role === "Student"
                )}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Students" />
                )}
              />
            )}

            {showRemoveStudents && (
              <Autocomplete
                multiple
                value={selectedStudents}
                onChange={(event, newValue) =>
                  handleSelectedStudentsOnChange(event, newValue)
                }
                getOptionLabel={(option) => option.email}
                id="controllable-states-demo"
                options={members?.filter(
                  (m) => exam.studentIds.includes(m.id) && m.role === "Student"
                )}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Students" />
                )}
              />
            )}

            {(showAddStudents || showRemoveStudents) && (
              <Button
                sx={{ margin: "5px" }}
                variant="contained"
                onClick={handleStudentsSaveOnClick}
              >
                Save
              </Button>
            )}
          </Fragment>
        )}
        <List>
          {members &&
            exam?.studentIds &&
            members
              ?.filter(
                (m) => exam.studentIds.includes(m.id) && m.role === "Student"
              )
              ?.map((m) => (
                <ListItem key={m.id}>
                  <CustomListItem
                    resource={"Student"}
                    header={`${m.firstName} ${m.lastName}`}
                    contentHeader="Email: "
                    contentText={m.email}
                  />
                </ListItem>
              ))}
        </List>
      </Grid>
    </Container>
  );
};

export default ExamDetails;
