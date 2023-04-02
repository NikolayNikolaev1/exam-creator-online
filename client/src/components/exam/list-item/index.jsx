import { Link } from "react-router-dom";
import "./ExamListItem.css";

const ExamListItem = ({ id, name, description, lecturer }) => {
  return (
    <div className="courses-container">
      <div className="course">
        <div className="course-preview">
          <h6>Exam</h6>
          <h2>{name}</h2>
          <a href="#">
            View all chapters <i className="fas fa-chevron-right"></i>
          </a>
        </div>
        <div className="course-info">
          <div className="progress-container">
            <div className="progress"></div>
            <span className="progress-text">6/9 Challenges</span>
          </div>
          <h6>Lecturer: {lecturer}</h6>
          <p>{description}</p>
          <Link to={`/exam/${id}`}>
            <button className="btn">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExamListItem;
