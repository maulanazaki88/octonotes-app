import React from "react";
import "./NotesCard.css";

function NotesCard(props) {
  return (
    <div
      id={props._id}
      className="notesCard"
      style={{ backgroundColor: `${props.color}` }}
    >
      <div className="nCCtWrp">
        <section className="button-g">
          <button
            className="noteBtn"
            type="button"
            onClick={() => props.archiveNote(props._id)}
          >
            <img
              className="markIcon"
              title="Archieve Notes"
              alt="markIcon"
              src="/png/bookmark-white.png"
            />
          </button>
          <button
            className="noteBtn"
            type="button"
            onClick={() => props.deleteNote(props._id)}
          >
            X
          </button>
        </section>
        <section className="nCT">
          <h3 className="nCT-txt">#{props.title}</h3>
        </section>
        <article className="nCM">
          <p className="nCM-txt">{props.message}</p>
        </article>
        <p className="nDate" >{props.date}</p>
      </div>
    </div>
  );
}

export default NotesCard;
