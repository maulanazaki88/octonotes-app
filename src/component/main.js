import React from "react";
import UserInput from "./UserInput";
import GridContainer from "./GridContainer";
import "./main.css";
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.color = ["#A2738C", "#B293A4", "#81799F", "#645C84"];
    this.submitHandler = this.submitHandler.bind(this);
    this.onChange = this.onChange.bind(this);
    this.startSearching = this.startSearching.bind(this);
    this.endSearching = this.endSearching.bind(this);
    this.inputFocus = this.inputFocus.bind(this);
    this.buttonRest = this.buttonRest.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.displayArchive = this.displayArchive.bind(this);
    this.srcInp = React.createRef();
    this.srcForm = React.createRef();
    this.srcBtn = React.createRef();
    this.showFormattedDate = (date) => {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }
      return new Date(date).toLocaleDateString("id-ID", options)
    }
    this.state = {
      notesArray: [
        {
          id: 1,
          title: "Babel",
          message: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
          date: this.showFormattedDate('2022-04-14T04:27:34.572Z'),
          createdAt: '2022-04-14T04:27:34.572Z',
          isArchived: false,
          
        },
        {
          id: 2,
          title: "Functional Component",
          message: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
          date: this.showFormattedDate('2022-04-14T04:27:34.572Z'),
          createdAt: '2022-04-14T04:27:34.572Z',
          isArchived: false,
          
        },
        {
          id: 3,
          title: "Modularization",
          message: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
          date: this.showFormattedDate('2022-04-14T04:27:34.572Z'),
          createdAt: '2022-04-14T04:27:34.572Z',
          isArchived: false,
          
        },
        {
          id: 4,
          title: "Lifecycle",
          message: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ",
          date: this.showFormattedDate('2022-04-14T04:27:34.572Z'),
          createdAt: '2022-04-14T04:27:34.572Z',
          isArchived: false,
          
        },
        {
          id: 5,
          title: "ESM",
          message: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
          date: this.showFormattedDate('2022-04-14T04:27:34.572Z'),
          createdAt: '2022-04-14T04:27:34.572Z',
          isArchived: false,
          
        },
        {
          id: 6,
          title: "Module Bundler",
          message: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
          date: this.showFormattedDate('2022-04-14T04:27:34.572Z'),
          createdAt: '2022-04-14T04:27:34.572Z',
          isArchived: false,
          
        }
      ],
      archivedNotes: [],
      input: {
        title: "",
        message: "",
        keywords: "",
      },
      isSearching: false,
      isSearchOn: false,
      isHalted: false,
      isDisplayingArchive: false,
      chrRmnsTtl: 25,
      chrRmnsMsg: 200,
      isTtlError: false,
      isMsgError: false,
    };
  }

  displayNotes() {
    if (this.state.isDisplayingArchive) {
      return this.state.archivedNotes;
    } else if (
      this.state.input.keywords === "all" ||
      this.state.input.keywords === "All"
    ) {
      return this.state.notesArray;
    } else if (this.state.input.keywords.length !== 0) {
      let filtered = this.state.notesArray.filter(
        (note) =>
          note.tag.includes(this.state.input.keywords) ||
          note.title.includes(this.state.input.keywords) ||
          note.message.includes(this.state.input.keywords)
      );
      return filtered;
    } else {
      return this.state.notesArray;
    }
  }

  displayTitle() {
    const archivedNotes = this.state.archivedNotes.slice(0);
    if (this.state.isDisplayingArchive) {
      return `${
        archivedNotes[0]
          ? "Archived Notes"
          : "You are currently didnt Archived any notes. To Archive notes click Archive button on right top of the Note Card "
      }`;
    } else if (this.state.input.keywords.length !== 0) {
      return `Show "${this.state.input.keywords}" notes`;
    } else if (!this.state.notesArray[0]) {
      return "Lets feeds Octo's belly with your productive tasks today!";
    } else {
      return "All Notes";
    }
  }

  submitHandler(e) {
    e.preventDefault();
    const state = this.state;
    const { title, message } = state.input;
    const currentArray = state.notesArray.slice(0);
    const dateNow = Date.now();
    const dateForm = new Date(dateNow);
    const date = new Date(dateForm);
    const dateString = date.toLocaleDateString().replaceAll("/", "");
    const timeString = date.toLocaleTimeString().replaceAll(":", "");
    const id = `${title[0]}${title.length}${message[0]}${message.length}#${dateString}%${timeString}`;

    let newNote = {
      id: id.replaceAll(" ", ""),
      title: title,
      message: message,
      date: this.showFormattedDate(dateForm),
      isArchived: false,
      createdAt: `${dateString}, ${timeString}`,
      
    };
    if (title.length === 0 && message.length === 0) {
      this.setState({ isTtlError: true, isMsgError: true }, () => {
        setTimeout(() => {
          this.setState({ isTtlError: false, isMsgError: false });
        }, 5000);
      });
    } else if (title.length === 0) {
      this.setState({ isTtlError: true }, () => {
        setTimeout(() => {
          this.setState({ isTtlError: false });
        }, 5000);
      });
    } else if (message.length === 0) {
      this.setState({ isMsgError: true }, () => {
        setTimeout(() => {
          this.setState({ isMsgError: false });
        }, 5000);
      });
    } else {
      this.setState(() => {
        return {
          ...state,
          notesArray: currentArray.concat(newNote),
          input: {
            title: "",
            message: "",
            keywords: "",
          },
          chrRmnsTtl: 25,
          chrRmnsMsg: 200,
        };
      });
      console.log("Notes created");
    }
  }

  onChange(e) {
    let inpVal = e.target.value;
    try {
      if (e.target.name === "title" && inpVal.length < 26) {
        this.setState({
          input: {
            ...this.state.input,
            [e.target.name]: inpVal,
          },
          chrRmnsTtl: 25 - inpVal.length,
        });
      } else if (e.target.name === "message" && inpVal.length < 201) {
        this.setState(() => {
          return {
            input: {
              ...this.state.input,
              [e.target.name]: inpVal,
            },
            chrRmnsMsg: 200 - inpVal.length,
          };
        });
      } else if (e.target.name === "keywords") {
        this.setState({
          input: {
            ...this.state.input,
            [e.target.name]: e.target.value,
          },
        });
      } else {
        throw new Error("INVALID EVENT : CANT CHANGE INPUT VALUE");
      }
    } catch (error) {
      console.log(error.stack);
    }
  }

  startSearching() {
    console.log("IS SEARCHING IS TRUE");
    this.setState(
      {
        isSearching: true,
      },
      () => {
        if (this.srcForm) {
          this.srcForm.current.classList.add("prolong");

          console.log("SRC FORM START PROLONG");
        } else if (!this.srcForm) {
          throw new Error("SRC FORM INACCESSIBLE");
        } else {
          throw new Error("SYSTEM FAILURE");
        }
      }
    );
  }

  endSearching() {
    this.srcForm.current.classList.remove("prolong");
    this.srcForm.current.style.animation =
      "shorten 0.3s 1 cubic-bezier(0,0.87,0.5,1)";

    this.srcForm.current.style.WebkitAnimation =
      "shorten 0.3s 1 cubic-bezier(0,0.87,0.5,1)";

    this.setState(() => {
      let state = this.state;
      return {
        ...state,
        isHalted: true,
      };
    });

    console.log("SRC FORM START SHORTEN");
  }

  inputFocus() {
    this.setState(() => {
      let state = this.state;
      return {
        ...state,
        isSearchOn: true,
      };
    });
    this.srcInp.current.focus();

    console.log("INPUT IS FOCUSED");
  }

  buttonRest() {
    this.srcForm.current.animation = "none";
    let startResting = () => {
      if (this.srcBtn) {
        this.srcBtn.current.classList.add("srcBtn");
        console.log("SRC BTN ADDED");
      } else if (!this.srcBtn) {
        throw new Error("SRC BTN IS BARELY INACCESSIBLE");
      } else {
        throw new Error("SYSTEM FAILURE");
      }
    };
    let setSearching = () => {
      this.setState({ isSearching: false, isSearchOn: false }, () =>
        startResting()
      );
    };
    setSearching();
  }

  deleteNote(id) {
    try {
      let allNotes = this.state.notesArray.concat(this.state.archivedNotes);
      let selectedNote = allNotes.find((note) => note.id === id);
      let status = selectedNote.isArchived;
      if (status) {
        let updatedNotes = this.state.archivedNotes.filter(
          (note) => note.id !== id
        );
        this.setState({ archivedNotes: updatedNotes });
        console.log(`Notes ${id} deleted successfully`);
      } else if (!status) {
        let updatedNotes = this.state.notesArray.filter(
          (note) => note.id !== id
        );
        this.setState({ notesArray: updatedNotes });
        console.log(`Notes ${id} deleted successfully`);
      } else {
        throw new Error("SYSTEM FAILURE");
      }
    } catch (err) {
      console.log(err.stack);
    }
  }

  archiveNote(id) {
    try {
      if (id) {
        let allNotes = this.state.notesArray.concat(this.state.archivedNotes);
        let selectedNote = allNotes.find((note) => note.id === id);
        let updatedNote = {
          ...selectedNote,
          isArchived: !selectedNote.isArchived,
        };
        const isArchived = selectedNote.isArchived;
        if (!isArchived) {
          let filteredNotes = this.state.notesArray.filter(
            (note) => note.id !== id
          );
          let updatedArchives = this.state.archivedNotes.concat(updatedNote);
          this.setState({
            archivedNotes: updatedArchives,
            notesArray: filteredNotes,
          });
        } else if (isArchived) {
          let filteredArchives = this.state.archivedNotes.filter(
            (note) => note.id !== id
          );
          let updatedNotes = this.state.notesArray.concat(updatedNote);
          this.setState({
            archivedNotes: filteredArchives,
            notesArray: updatedNotes,
          });
        } else {
          throw new Error("INVALID NOTES ID: CANNOT ARCHIVE NOTE");
        }
      }
    } catch (err) {
      console.log(err.stack);
    }
  }

  displayArchive() {
    this.setState({ isDisplayingArchive: !this.state.isDisplayingArchive });
  }

  componentDidMount() {
    document.title = "Octo Notes"
    this.render();
  }

  render() {
    return (
      <main className="main">
        <section className="brand">
          <img
            className="brand-logo"
            src="svg/brand.svg"
            alt="brand"
            title="Octo Notes!!!"
          ></img>
        </section>

        <UserInput
          isSearching={this.state.isSearching}
          srcForm={this.srcForm}
          isSearchOn={this.state.isSearchOn}
          buttonRest={this.buttonRest}
          inputFocus={this.inputFocus}
          srcInp={this.srcInp}
          endSearching={this.endSearching}
          isHalted={this.state.isHalted}
          startSearching={this.startSearching}
          srcBtn={this.srcBtn}
          submitHandler={this.submitHandler}
          title={this.state.input.title}
          message={this.state.input.message}
          onChange={this.onChange}
          keywords={this.state.input.keywords}
          displayArchive={this.displayArchive}
          isDisplayingArchive={this.state.isDisplayingArchive}
          chrRmnsTtl={this.state.chrRmnsTtl}
          chrRmnsMsg={this.state.chrRmnsMsg}
          isTtlError={this.state.isTtlError}
          isMsgError={this.state.isMsgError}
        />

        <section className="displayTitle">
          <h1 className="title-txt">{this.displayTitle()}</h1>
        </section>

        <GridContainer
          notesArray={this.displayNotes()}
          notesArrayLgt={this.displayNotes().length}
          color={this.color}
          colorLgt={this.color.length}
          deleteNote={(id) => this.deleteNote(id)}
          archiveNote={(id) => this.archiveNote(id)}
        />
      </main>
    );
  }
}

export default MainPage;
