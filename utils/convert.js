const fs = require("fs");
const path = require("path");

function readDir(thispath) {
  return new Promise((resolve, reject) => {
    fs.readdir(path.resolve(thispath), { encoding: "utf-8" }, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
}

async function init() {
  console.log("GATHERING UTILITY FILES...");
  let manifest = {
    keys: [],
    data: {},
  };
  const root = path.resolve(`./lib/`.replace(/\\/gm, "/"));
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
    });

  console.log(files);
  files.forEach((file) => {
    manifest["keys"].push(file.replace(/\..*/, ""));
    manifest["data"][file.replace(/\..*/, "")] = fs.readFileSync(
      `${root}/${file}`,
      "utf8"
    );
  });
  const targetPath = path.resolve(`./utils/manifest.json`.replace(/\\/gm, "/"));

  fs.writeFileSync(targetPath, JSON.stringify(manifest), { encoding: "utf-8" });
  console.log("WRITTEN AS JSON MANIFEST");
}
init();
