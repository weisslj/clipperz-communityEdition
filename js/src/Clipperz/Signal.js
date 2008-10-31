if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.Signal) == 'undefined') { Clipperz.Signal = {}; }

Clipperz.Signal.VERSION = "0.1";
Clipperz.Signal.NAME = "Clipperz.Signal";

MochiKit.Base.update(Clipperz.Signal, {

	//-------------------------------------------------------------------------

	'__repr__': function () {
		return "[" + this.NAME + " " + this.VERSION + "]";
	},

	//-------------------------------------------------------------------------

	'toString': function () {
		return this.__repr__();
	},

	//-------------------------------------------------------------------------

	'fireNativeEvent': function(element, eventName) {
		if (element.fireEvent) {
			// MSIE
			element.fireEvent(eventName);
		} else {
			// W3C
			var event;
			
			event = document.createEvent("HTMLEvents");
			event.initEvent(eventName.replace(/^on/, ""), true, true);
			element.dispatchEvent(event);
		}
	},

	//-------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"

});



