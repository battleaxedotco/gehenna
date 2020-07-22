const fs = require("fs");
const path = require("path");
const spy = require("cep-spy").default;
import { evalScript } from "cluecumber";
let gehenna = {};

function readDir(thispath) {
  return new Promise((resolve, reject) => {
    fs.readdir(path.resolve(thispath), { encoding: "utf-8" }, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
}

gehenna["init"] = async function () {
  if (!window.__adobe_cep__) return null;
  const root = `${__dirname}/node_modules/gehenna/lib/`.replace(/\\/gm, "/");
  let files = await readDir(root);
  files = files
    .sort((a, b) => {
      return /^\w{4}\.jsx$/i.test(a) ? 1 : /^\w{4}\.jsx$/i.test(b) ? -1 : 0;
    })
    .sort((a, b) => {
      return /json/i.test(a) ? -1 : /json/i.test(b) ? 1 : 0;
    })
    .sort((a, b) => {
      return /console/i.test(a) ? -1 : /console/i.test(b) ? 1 : 0;
    })
    .filter((file) => {
      return (
        !/^\w{4}\.jsx$/i.test(file) ||
        (/^\w{4}\.jsx$/i.test(file) && new RegExp(spy.appName, "i").test(file))
      );
    });
  for (var i = 0; i < files.length; i++) {
    let file = files[i];
    let data = fs.readFileSync(`${root}${file}`, "utf8");
    await evalScript(data);
    console.log(`Loading ${root}${file}`);
  }
  return true;
};

export default gehenna;
