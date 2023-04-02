import { Fragment } from "react";
import "./ListItem.css";
import { List, ListItem } from "@mui/material";

const CustomListItem = ({
  resource,
  header,
  contentHeader,
  contentText,
  contentList,
  buttons,
}) => {
  return (
    <div className="courses-container">
      <div className="course">
        <div className="course-preview">
          <h6>{resource}</h6>
          <h2>{header}</h2>
        </div>
        <div className="course-info">
          {contentHeader ? (
            <Fragment>
              <h6>{contentHeader}</h6>
              <p>{contentText}</p>
            </Fragment>
          ) : (
            <List>
              {contentList?.map((a, i) => (
                <ListItem key={a.id}>
                  <h6>Answear {i + 1}: </h6>
                  <p>{a.text}</p>
                </ListItem>
              ))}
            </List>
          )}

          {buttons?.map((b, i) => (
            <Fragment key={i}>{b}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomListItem;
