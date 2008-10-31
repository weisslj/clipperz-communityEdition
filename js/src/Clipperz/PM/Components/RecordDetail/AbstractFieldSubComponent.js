if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.PM) == 'undefined') { Clipperz.PM = {}; }
if (typeof(Clipperz.PM.Components) == 'undefined') { Clipperz.PM.Components = {}; }
if (typeof(Clipperz.PM.Components.RecordDetail) == 'undefined') { Clipperz.PM.Components.RecordDetail = {}; }

//#############################################################################

Clipperz.PM.Components.RecordDetail.AbstractFieldSubComponent = function(anElement, args) {
	args = args || {};

    Clipperz.PM.Components.RecordDetail.AbstractFieldSubComponent.superclass.constructor.call(this, anElement, args);

	this._fieldComponent = args.fieldComponent || null;
	
	this.render();
	
	return this;
}

//=============================================================================

YAHOO.extendX(Clipperz.PM.Components.RecordDetail.AbstractFieldSubComponent, Clipperz.PM.Components.RecordDetail.AbstractComponent, {

	'toString': function() {
		return "Clipperz.PM.Components.RecordDetail.AbstractFieldSubComponent";
	},

	//-------------------------------------------------------------------------

	'fieldComponent': function() {
		return this._fieldComponent;
	},

	//-------------------------------------------------------------------------

	'mainComponent': function() {
		return this.fieldComponent().mainComponent();
	},
	
	//-------------------------------------------------------------------------

	'recordField': function() {
		return this.fieldComponent().recordField();
	},

	//-------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"
});

