import { Link } from "react-router-dom";
import { List, ListItem } from "@mui/material";
import "../../../ListItem.css";

const QuestionListItem = ({
  id,
  text,
  answears,
  examId,
  handleQuestionDeleteOnClick,
}) => {
  return (
    <div className="courses-container">
      <div className="course">
        <div className="course-preview">
          <h6>Question</h6>
          <h2>{text}</h2>
        </div>
        <div className="course-info">
          <List>
            {answears.map((a, i) => (
              <ListItem key={a.id}>
                <h6>Answear {i + 1}</h6>
                <p>{a.text}</p>
              </ListItem>
            ))}
          </List>

          <Link to={`/exam/${examId}/question/${id}/edit`}>
            <button className="btn-edit">Edit</button>
          </Link>

          <Link onClick={(e) => handleQuestionDeleteOnClick(e, id)}>
            <button className="btn">Delete</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuestionListItem;
