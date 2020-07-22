var console = {
  log: function (data) {
    JSXEvent(data, "console");
  },
  error: function (data) {
    JSXEvent(data, "console_error");
  },
  debug: function (data) {
    JSXEvent(data, "console_debug");
  },
};

// Thanks Davide Barranca
// NOTE: This does not work in Animate. Currently asking the Adobe team for an alternative
function JSXEvent(payload, eventType) {
  try {
    var xLib = new ExternalObject("lib:PlugPlugExternalObject");
  } catch (e) {
    // JSXEvent(e, "console");
  }
  if (xLib) {
    var eventObj = new CSXSEvent();
    eventObj.type = eventType;
    eventObj.data = payload;
    eventObj.dispatch();
  }
  return;
}
