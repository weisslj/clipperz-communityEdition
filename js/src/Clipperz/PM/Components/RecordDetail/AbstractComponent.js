if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.PM) == 'undefined') { Clipperz.PM = {}; }
if (typeof(Clipperz.PM.Components) == 'undefined') { Clipperz.PM.Components = {}; }
if (typeof(Clipperz.PM.Components.RecordDetail) == 'undefined') { Clipperz.PM.Components.RecordDetail = {}; }

//#############################################################################

Clipperz.PM.Components.RecordDetail.AbstractComponent = function(anElement, args) {
	args = args || {};

    Clipperz.PM.Components.RecordDetail.AbstractComponent.superclass.constructor.call(this, args);

	this._element = anElement;
	this._mainComponent = args.mainComponent;
	
	return this;
}

//=============================================================================

YAHOO.extendX(Clipperz.PM.Components.RecordDetail.AbstractComponent, Clipperz.PM.Components.BaseComponent, {

	'toString': function() {
		return "Clipperz.PM.Components.RecordDetail.AbstractComponent";
	},

	//-------------------------------------------------------------------------

	'mainComponent': function() {
		return this._mainComponent;
	},
	
	//-------------------------------------------------------------------------

	'record': function() {
		return this.mainComponent().record();
	},
	
	//-------------------------------------------------------------------------

	'editMode': function() {
		return this.mainComponent().editMode();
	},
	
	//-------------------------------------------------------------------------

	'render': function() {
		this.element().update("");
		this.update();
	},

	//-------------------------------------------------------------------------

	'update': function(anEvent) {
		if (this.editMode() == 'EDIT') {
			this.updateEditMode();
		} else if (this.editMode() == 'VIEW') {
			this.updateViewMode();
		}
	},

	//-------------------------------------------------------------------------

	'updateViewMode': function() {},
	'updateEditMode': function() {},
	'synchronizeComponentValues': function() {},
	
	//-------------------------------------------------------------------------

	'destroy': function() {
		this.element().remove();
	},
	
	//-------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"
});

