/**
 * Gehenna is an async function which retrieves data saved locally to the module:
 *
 *      import gehenna from 'gehenna'
 *      await gehenna()
 *
 * To see details about the functions themselves, see the root README or js files within ./lib
 *
 */

// Gather data about current panel via cep-spy
const spy = window.__adobe_cep__
  ? require("cep-spy").default
  : { appName: "ILST" };
import { evalScript } from "cluecumber";

export default async function () {
  //
  // Require relative gehenna object created through `npm run convert` on root
  const manifest = require("./utils/manifest.json");
  if (!window.__adobe_cep__) return null;
  //
  // Enumerate and evaluate keys in specific order, except if utility for a different host app
  // i.e. -- Don't load AEFT.jsx if the panel is running in ILST
  for (let key of manifest.keys.filter((file) => {
    return (
      !/^\w{4}$/i.test(file) ||
      /JSON/i.test(file) ||
      (/^\w{4}$/i.test(file) && new RegExp(spy.appName, "i").test(file))
    );
  })) {
    //
    // Asynchronously evaluate the raw string data and report back to user
    await evalScript(manifest.data[key]);
    console.log(`Loading ${key}.jsx`);
  }
  return true;
}
