import React from "react";
import NotesCard from "./NotesCard";

import "./GridContainer.css";

function GridContainer(props) {
  return (
    <ul className="gridContainer">
      {props.notesArray
        .slice(0)
        .reverse()
        .map((note, index) => {
          let color = [];

          if (props.notesArrayLgt > 3) {
            color = props.color;
            let colorOffset = [
              props.color[props.colorLgt - 1],
              ...props.color.slice(0, 3),
            ];
            for (let n = 0; n < Math.floor(props.notesArrayLgt / 3); n++) {
              color = color.concat(colorOffset);
              colorOffset = [
                colorOffset[colorOffset.length - 1],
                ...colorOffset.slice(0, 3),
              ];
            }
          } else {
            color = props.color;
          }

          let { id, title, message, date } = note;
          return (
            <li key={id}>
              <NotesCard
                _id={id}
                title={title}
                message={message}
                date={date}
                color={color[index]}
                deleteNote={(id) => props.deleteNote(id)}
                archiveNote={(id) => props.archiveNote(id)}
              />
            </li>
          );
        })}
    </ul>
  );
}

export default GridContainer;
