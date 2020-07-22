// Need to merge fake/CEP-spy or handle panelify compatibility.
// For now, just nullify results to prevent browser errors.
let isBrowser = !window.__adobe_cep__;

let fspath = require("path");
let spy = !isBrowser ? require("cep-spy").default : null;
let fs = require("fs");

// Opens a native open dialog and returns the target folder/file path as obj.path
function openDialog(title, isFolder = false) {
  if (isBrowser) return null;
  let menu = cep.fs.showOpenDialogEx(true, isFolder, title);
  return menu.err
    ? { err: menu.err, path: null }
    : menu.data.length
      ? { err: null, path: fspath.resolve(menu.data[0]) }
      : { err: "Canceled", path: null };
}

function openURL(url) {
  if (window.__adobe_cep__)
    cep.util.openURLInDefaultBrowser(url)
  else
    window.open(url)
}

// Opens a native save dialog and returns the target file
// This should append file type, but currently does not
function saveDialog(title, filetypes) {
  if (isBrowser) return null;
  let menu = cep.fs.showSaveDialogEx(title, null, filetypes);
  return menu.err
    ? { err: menu.err, path: null }
    : menu.data.length
      ? { err: null, path: fspath.resolve(menu.data) }
      : { err: "Canceled", path: null };
}

// Promisified wrapper around CSInterface.evalScript
// Returns a promise/thenable object which is pre-parsed if JSON
// If not in a CEP panel (and in browser/panelify, return second param as result)
async function evalScript(text, defs = {}, autoparse = false) {
  let params = autoparse ? convertJSON(text) ? convertJSON(text) : text : text;
  if (!isBrowser) {
    let CS_Interface = new CSInterface()
    return new Promise((resolve, reject) => {
      CS_Interface.evalScript(`${params}`, res => {
        if (res) resolve(isJson(res) ? JSON.parse(res) : res);
        else if (res.length) reject({ error: res });
      });
    });
  }
  else return defs;
}


function copy(text) {
  var textarea = document.createElement('textarea');
  textarea.textContent = text;
  document.body.appendChild(textarea);
  let clipboard;
  if (window.__adobe_cep__) {
    textarea.select();
    clipboard = document.execCommand('copy')
  } else {
    var selection = document.getSelection();
    var range = document.createRange();
    range.selectNode(textarea);
    selection.removeAllRanges();
    selection.addRange(range);
    clipboard = document.execCommand('copy')
    selection.removeAllRanges();
  }
  console.log('copied:', clipboard);
  document.body.removeChild(textarea);
  return clipboard;
}

// Loads/executes .jsx script into memory from any path
function loadScript(path) {
  if (isBrowser) return null;
  // Correctly execute regardless of whether Animate or regular CEP app
  if (!/FLPR/.test(spy.appName))
    evalScript(`$.evalFile('${fspath.resolve(path)}')`);
  // Thanks to @adamplouff for below
  else
    evalScript(
      `fl.runScript(FLfile.platformPathToURI("${fspath.resolve(path)}"))`
    );
}

// Determine if the current String is JSON notation
function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

// Would love to get an autoparsing JSON parameters event up and running...
function convertJSON(text) {
  // console.log(text)
  return false;
}

// Should get this working -- native CSEvent dispatch and listeners
// Currently requires CSInterface be preloaded for CSEvent class
function dispatchEvent(name, data) {
  if (isBrowser) return null;
  let CS_Interface = new CSInterface();
  var event = new CSEvent(name, "APPLICATION");
  event.data = data;
  CSInterface.dispatchEvent(event);
}

// Should replace this with node's native fs to port into future UXP framework
function makeDir(root) {
  if (isBrowser) return null;
  window.cep.fs.readFile(decodeURI(root).replace(/file\:\/{1,}/, "")).err
    ? new Promise((resolve, reject) => {
      evalScript(
        `var folder = new Folder(${decodeURI(root)});
          if (!folder.exists) {
            var parts = root.split("/");
            parts.pop();
            mkdir(parts.join("/"));
            folder.create();
          }`,
        resolve(true)
      );
    }).catch(err => {
      reject(err);
    })
    : null;
}

async function readDir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(fspath.resolve(path), { encoding: "utf-8" }, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
}

async function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fspath.resolve(path), data, err => {
      if (err) reject(err);
      resolve(true);
    });
  });
}

/**
 * Converts a RGB color array to hexadecimal format
 *
 * @param {array} val          The array of floating values (eg. from shapes.c.k, like below:
 *                                      [ 0.525490224361, 0.262745112181, 0.262745112181, 1 ]
 * @param {boolean} hashed     If false, don't prepend # to result
 *
 * @return {string}   The final hexademical color string (eg. '#b2bce')
 */
function rgbToHex(val, hashed = true) {
  while (val.length > 3) val.pop();
  return `${hashed ? "#" : ""}${val
    .map(c => {
      return /AEFT/.test(spy.appName) ? (c * 255).toFixed(0) : c;
    })
    .map(c => {
      c = c < 256 ? Math.abs(c).toString(16) : 0;
      return c.length < 2 ? `0${c}` : c;
    })
    .join("")}`;
}

// Exports all functions needed to be imported from another file.
// Any of these functions can be imported via:
//   import { openDialog, saveDialog } from 'cluecumber'
export {
  openDialog,
  saveDialog,
  loadScript,
  evalScript,
  rgbToHex,
  makeDir,
  readDir,
  copy,
  openURL,
  writeFile,
  dispatchEvent
};
