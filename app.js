const notes = require("./notes");
const chalk = require("chalk");
const yargs = require("yargs");
const { string, argv } = require("yargs");

yargs.version("1.1.0");

//Create add command
yargs.command({
  command: "add",
  describe: "add a new note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "removs a note",
  builder: {
    title: {
      describe: "title which we want to remove",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    console.log("removing the note");
    notes.removeNote(argv.title);
  },
});

// Create list command
yargs.command({
  command: "list",
  describe: "lists all the notes",
  handler: function () {
    notes.listNotes();
  },
});

// Create a read command

yargs.command({
  command: "read",
  describe: "reads the notes",
  builder: {
    title: {
      describe: "title which we want to read",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    console.log("reading the notes");

    notes.readNotes(argv.title);
  },
});

yargs.parse();
