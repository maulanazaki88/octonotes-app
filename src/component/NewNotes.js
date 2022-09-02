import React from "react";
import "./NewNotes.css";

function NewNotes(props) {
  return (
    <form className="newNotes" onSubmit={() => props.submitNote()}>
      <div className="nNWrp">
        <fieldset className="ttlField">
          <input
            type="text"
            name="title"
            value={props.title}
            className="inpTtl"
            onChange={props.onChange}
          />
        </fieldset>
        <fieldset className="msgField">
          <textarea
            name="message"
            value={props.message}
            className="inpMsg"
            placeholder="Enter message"
            onChange={props.onChange}
          ></textarea>
        </fieldset>
      </div>
      <button className="submitBtn" type="submit">
        Save
      </button>
    </form>
  );
}

export default NewNotes;
