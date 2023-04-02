import { List, ListItem } from "@mui/material";
import { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useFacilityContext } from "../../contexts/FacilityContext";
import "./Home.css";
import CustomListItem from "../list-item";

const Home = () => {
  const { facility } = useFacilityContext();
  const { name, description, exams, members } = facility;
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
            <CustomListItem
              resource={"Exam"}
              header={e.name}
              contentHeader={`Lecturer: ${
                members
                  .filter((m) => m.id === e.lecturerId)
                  .map((m) => `${m.firstName} ${m.lastName}`)[0]
              }`}
              contentText={e.description}
              buttons={[
                <Link to={`/exam/${e.id}`}>
                  <button className="btn">Details</button>
                </Link>,
              ]}
            />
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
};

export default Home;
