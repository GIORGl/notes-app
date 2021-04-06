const chalk = require("chalk");
const fs = require("fs");

const getNotes = () => {
  return "your notes...";
};

const addNote = function (title, body) {
  const notes = loadNotes();
  const duplacateNotes = notes.find((note) => note.title == title);
  if (!duplacateNotes) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green("New note added!"));
  } else {
    console.log(chalk.red("Note title taken"));
  }
};

const removeNote = function (title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green("Note removed"));
  } else if (notes.length == notesToKeep.length) {
    console.log(chalk.red("no note found,please try again!"));
  }

  saveNotes(notesToKeep);
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.yellow("All the notes:"));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const saveNotes = function (notes) {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();

    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

const readNotes = (title) => {
  const notes = loadNotes();
  const readableNote = notes.find((elem) => elem.title === title);

  if (readableNote) {
    console.log(chalk.bold.blue(readableNote.title));
    console.log(readableNote.body);
  } else {
    console.log(readableNote);
    console.log(chalk.red("No note found!"));
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
};
