import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ButtonGroup, List, ListItem, ToggleButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuthContext } from "../../contexts/AuthContext";
import { useFacilityContext } from "../../contexts/FacilityContext";
import CustomListItem from "../list-item";
import "./Home.css";
import useHome from "./useHome";

const StyledToggleButton = styled(ToggleButton)({
  margin: "10px",
  color: "#03153b",
  backgroundColor: "white",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#03153b",
  },
  "&:hover": {
    color: "white",
    backgroundColor: "#2A265F",
  },
});

const Home = () => {
  const { facility } = useFacilityContext();
  const { name, description, exams, members } = facility;
  const { auth } = useAuthContext();
  const { collectionType, handleCollectionChange, collection } = useHome();

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

      {auth.role === "Owner" && (
        <ButtonGroup aria-label="outlined primary button group">
          <StyledToggleButton
            // className="owner-button"
            selected={collectionType === "exam"}
            value="exam"
            onClick={(e) => handleCollectionChange(e, e.target.value)}
          >
            Exams
          </StyledToggleButton>
          <StyledToggleButton
            // className="owner-button"
            selected={collectionType === "lecturer"}
            value="lecturer"
            onClick={(e) => handleCollectionChange(e, e.target.value)}
          >
            Lecturers
          </StyledToggleButton>
          <StyledToggleButton
            // className="owner-button"
            selected={collectionType === "student"}
            value="student"
            onClick={(e) => handleCollectionChange(e, e.target.value)}
          >
            Students
          </StyledToggleButton>
        </ButtonGroup>
      )}

      <List>
        {collectionType === "exam" ? (
          exams?.length === 0 ? (
            <h1>There are no exams currently in this facility.</h1>
          ) : (
            exams?.map((e) => (
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
            ))
          )
        ) : collection?.length === 0 ? (
          <h1>{`There are no ${collectionType}s currently in this facility.`}</h1>
        ) : (
          collection?.map((c) => (
            <ListItem key={c.id}>
              <CustomListItem
                resource={collectionType}
                header={`${c.firstName} ${c.lastName}`}
                contentHeader="Email: "
                contentText={c.email}
              />
            </ListItem>
          ))
        )}
      </List>
    </Fragment>
  );
};

export default Home;
