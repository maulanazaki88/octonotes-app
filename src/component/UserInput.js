import React from "react";
import "./UserInput.css";

function UserInput(props) {
  return (
    <section className="userInput">
      <div className="uI-BtnG">
        {props.isSearching ? (
          <form
            className="srcForm"
            ref={props.srcForm}
            onAnimationEnd={
              props.isSearchOn ? props.buttonRest : props.inputFocus
            }
          >
            <input
              className="srcInp"
              type="text"
              name="keywords"
              value={props.keywords}
              ref={props.srcInp}
              onBlur={props.endSearching}
              onChange={props.onChange}
            />
            <img
              className="iconBtn"
              id="srcIcon"
              src="png/search-black.png"
              alt="search"
              title="search"
            />
          </form>
        ) : (
          <button
            className={props.isHalted ? "halt" : "srcBtn"}
            type="button"
            onClick={props.startSearching}
            ref={props.srcBtn}
            onAnimationEnd={() => {
              try {
                if (props.srcBtn) {
                  props.srcBtn.current.classList.remove("halt");
                  // this.srcBtn.current.classList.add("srcBtn")
                  console.log("HALT REMOVED");
                } else if (!props.srcBtn) {
                  throw new Error("SYSTEM FAILURE");
                }
              } catch (err) {
                console.log(err.stack);
              }
            }}
          >
            <img
              className="iconBtn"
              id="srcIcon"
              src="png/search-black.png"
              alt="search"
              title="search"
            />
          </button>
        )}

        <button
          className={
            props.isDisplayingArchive ? "bookMarkBtn outlined" : "bookMarkBtn"
          }
          onClick={() => props.displayArchive()}
        >
          <img
            className="iconBtn"
            id="srcIcon"
            src="png/bookmark-black.png"
            alt="bookmark"
            title="bookmark"
          />
        </button>
      </div>
      <form
        className={props.isDisplayingArchive ? "newNotes off" : "newNotes"}
        onSubmit={props.submitHandler}
      >
        <div className="nNWrp">
          <fieldset className="ttlField">
            <input
              type="text"
              name="title"
              value={props.title}
              className="inpTtl"
              placeholder="Enter Title"
              onChange={props.onChange}
            />
            <p
              className={
                props.chrRmnsTtl === 0 ? "chrRmnsTtl alert" : "chrRmnsTtl"
              }
            >
              {props.isTtlError ? "Feed empty notes to Octo just hurt her belly" : `character remains : ${props.chrRmnsTtl}`}
            </p>
          </fieldset>
          <fieldset className="msgField">
            <textarea
              name="message"
              value={props.message}
              className="inpMsg"
              placeholder="Enter message"
              onChange={props.onChange}
            ></textarea>
            <p
              className={
                props.chrRmnsMsg === 0 ? "chrRmnsMsg alert" : "chrRmnsMsg"
              }
            >
              {props.isMsgError ? "Feed empty notes to Octo just hurt her belly" : `character remains : ${props.chrRmnsMsg}`}
            </p>
          </fieldset>
        </div>

        <button className="submitBtn" type="submit">
          Save
        </button>
      </form>
    </section>
  );
}

export default UserInput;
