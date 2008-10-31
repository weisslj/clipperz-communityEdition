if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.DOM) == 'undefined') { Clipperz.DOM = {}; }

Clipperz.DOM.VERSION = "0.1";
Clipperz.DOM.NAME = "Clipperz.DOM";

MochiKit.Base.update(Clipperz.DOM, {

	//-------------------------------------------------------------------------

	'__repr__': function () {
		return "[" + this.NAME + " " + this.VERSION + "]";
	},

	//-------------------------------------------------------------------------

	'toString': function () {
		return this.__repr__();
	},

	//-------------------------------------------------------------------------

	'selectOptionMatchingValue': function (aSelectElement, aValue, shouldUseCaseInsensitiveTest) {
		var selectedOptionIndex;
		var i, c;
		
		selectedOptionIndex = -1;
		
		c = aSelectElement.options.length;
		for (i=0; (i<c) && (selectedOptionIndex == -1); i++) {
			if (shouldUseCaseInsensitiveTest == true) {
				if (aSelectElement.options[i].value.toLowerCase() == aValue.toLowerCase()) {
					selectedOptionIndex = i;
				}
			} else {
				if (aSelectElement.options[i].value == aValue) {
					selectedOptionIndex = i;
				}
			}
		}
		
		if (selectedOptionIndex != -1) {
			aSelectElement.selectedIndex = selectedOptionIndex;
		}
	},

	//-------------------------------------------------------------------------

	'setFormContents': function(aNode, someValues) {
		var node;
		var values;
		var i, c;
		
		values = {};
		c = someValues[0].length;
		for (i=0; i<c; i++) {
			values[someValues[0][i]] = someValues[1][i];
		}
		
//		var m = MochiKit.Base;
//		var self = MochiKit.DOM;
		if (typeof(aNode) == "undefined" || aNode === null) {
			node = MochiKit.DOM._document.body;
		} else {
			node = MochiKit.DOM.getElement(aNode);
		}

		MochiKit.Base.nodeWalk(node, function(aNode) {
			var result;
			var name;

			result = null;
			name = aNode.name;
			if (MochiKit.Base.isNotEmpty(name) && (typeof(values[name]) != 'undefined')) {
				var tagName;

				tagName = aNode.tagName.toUpperCase();
				if (tagName === "INPUT" && (aNode.type == "radio" || aNode.type == "checkbox")) {
					aNode.checked = values[name];
				} else if (tagName === "SELECT") {
					if (aNode.type == "select-one") {
						Clipperz.DOM.selectOptionMatchingValue(aNode, values[name]);
					} else { //	aNode.type == "select-multiple"
MochiKit.Logging.logWarning("### unhandled Select.type = 'select-multiple' condition");
					}
				} else if (tagName === "FORM" || tagName === "P" || tagName === "SPAN" || tagName === "DIV") {
					result = aNode.childNodes;
				} else {
					aNode.value = values[name]
				}
			} else {
				result = aNode.childNodes;
			}

			return result;
		});
	},
	
	//-------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"

});

