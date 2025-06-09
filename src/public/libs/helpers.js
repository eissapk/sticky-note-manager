const fs = require("fs");
const path = require("path");
const process = require("process");

function getCredentials() {
  const cwd = process.cwd();
  const dbPath = path.resolve(cwd + "/credentials.json");
  try {
    return JSON.parse(fs.readFileSync(dbPath).toString());
  } catch (err) {
    // notify("Can't connect to credentials db!");
    console.error("Can't connect to credentials db\n", err);
    return null;
  }
}

function getNotes() {
  const cwd = process.cwd();
  const dbPath = path.resolve(cwd + "/db.json");
  try {
    return JSON.parse(fs.readFileSync(dbPath).toString());
  } catch (err) {
    console.error("Can't connect to notes db\n", err);
    return null;
  }
}

function exists(pwd, secrets) {
  var matched = false;
  for (let i = 0; i < secrets.length; i++) {
    if (bcrypt.compareSync(pwd, secrets[i])) {
      matched = true;
      break;
    }
  }
  return matched;
}

function hashPwd(pwd) {
  return bcrypt.hashSync(pwd, bcrypt.genSaltSync(10));
}

function getNextId(arr) {
  if (!arr.length) return 1;
  let ids = [];
  arr.forEach((obj) => ids.push(obj.id)); // push all ids
  ids.sort((a, b) => a - b); // ascending order
  const currentMaxId = ids.pop();
  const nextId = currentMaxId + 1; // get max number + 1
  //   console.log({ currentMaxId });
  //   console.log({ nextId });
  return nextId;
}

function getNote(id) {
  const notes = getNotes().notes;
  return notes.find((item) => item.id == id);
}

function removeNote(id, cb) {
  const cwd = process.cwd();
  const dbPath = path.resolve(cwd + "/db.json");
  const notes = getNotes().notes;
  const fitleredNotes = notes.filter((item) => item.id != id);
  try {
    fs.writeFileSync(dbPath, JSON.stringify({ notes: fitleredNotes }, null, 2));
    if (cb) cb(id);
  } catch (err) {
    console.error("Can't delete note\n", err);
    if (cb) cb(null);
  }
}

function addNote(obj, cb) {
  const cwd = process.cwd();
  const dbPath = path.resolve(cwd + "/db.json");
  const notes = getNotes().notes;
  // todo: improve the speed of this, so instead of checking the next id, just add unique id directly
  obj.id = getNextId(notes);
  notes.push(obj);
  try {
    fs.writeFileSync(dbPath, JSON.stringify({ notes }, null, 2));
    if (cb) cb(obj.id);
  } catch (err) {
    console.error("Can't add note\n", err);
    if (cb) cb(null);
  }
}

function editNote(obj, cb) {
  const cwd = process.cwd();
  const dbPath = path.resolve(cwd + "/db.json");
  const notes = getNotes().notes;
  notes.find((item) => {
    if (item.id == obj.id) {
      item.body = obj.body;
      item.color = obj.color;
    }
  });

  try {
    fs.writeFileSync(dbPath, JSON.stringify({ notes }, null, 2));
    if (cb) cb(obj);
  } catch (err) {
    console.error("Can't edit note\n", err);
    if (cb) cb(null);
  }
}
