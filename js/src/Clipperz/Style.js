if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.Style) == 'undefined') { Clipperz.Style = {}; }

Clipperz.Style.VERSION = "0.1";
Clipperz.Style.NAME = "Clipperz.DOM";

MochiKit.Base.update(Clipperz.Style, {

	//-------------------------------------------------------------------------

	'__repr__': function () {
		return "[" + this.NAME + " " + this.VERSION + "]";
	},

	//-------------------------------------------------------------------------

	'toString': function () {
		return this.__repr__();
	},

	//-------------------------------------------------------------------------

	'applyZebraStylesToTable': function(aTable) {
		var tbody;
		var tbodyRows;
		var i,c;
		
		tbody = MochiKit.DOM.getFirstElementByTagAndClassName('tbody', null, aTable);
		tbodyRows = tbody.childNodes;
//		tbodyRows = MochiKit.DOM.getElementsByTagAndClassName('tr', null, tbody)
		c = tbodyRows.length;
		for (i=0; i<c; i++) {
			var element;

			element = YAHOO.ext.Element.get(tbodyRows[i]);
			element.addClass(((i%2 == 0) ? "zebra_odd": "zebra_even"));
			element.removeClass(((i%2 == 1) ? "zebra_odd": "zebra_even"));
		}
	},
	
	//-------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"

});

