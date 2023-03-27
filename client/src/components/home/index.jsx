import { List, ListItem } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useFacilityContext } from "../../contexts/FacilityContext";
import ExamListItem from "../exam/list-item";
import "./Home.css";

const Home = () => {
  const { name, description, exams, members } = useFacilityContext();
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof auth.id === "undefined") navigate("/login");
  }, [auth]);

  return (
    <Fragment>
      <div className="projcard projcard-blue">
        <div className="projcard-innerbox">
          <div className="projcard-textbox">
            <div className="projcard-title">{name}</div>
            <div className="projcard-subtitle">Welcome {auth.name}</div>
            <div className="projcard-bar"></div>
            <div className="projcard-description">{description}</div>
            <div className="projcard-tagbox">
              <span className="projcard-tag">
                {members?.filter((m) => m.role === "Lecturer").length} Lecturers
              </span>
              <span className="projcard-tag">
                {members?.filter((m) => m.role === "Student").length} Students
              </span>
            </div>
          </div>
        </div>
      </div>
      <List>
        {exams?.map((e) => (
          <ListItem key={e.id}>
            <ExamListItem
              id={e.id}
              name={e.name}
              description={e.description}
              lecturer={e.lecturerName}
            />
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
};

export default Home;
