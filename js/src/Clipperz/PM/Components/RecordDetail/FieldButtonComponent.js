if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.PM) == 'undefined') { Clipperz.PM = {}; }
if (typeof(Clipperz.PM.Components) == 'undefined') { Clipperz.PM.Components = {}; }
if (typeof(Clipperz.PM.Components.RecordDetail) == 'undefined') { Clipperz.PM.Components.RecordDetail = {}; }

//#############################################################################

Clipperz.PM.Components.RecordDetail.FieldButtonComponent = function(anElement, args) {
	args = args || {};

    Clipperz.PM.Components.RecordDetail.FieldButtonComponent.superclass.constructor.call(this, anElement, args);

	this._button = null;

	this.render();
	
	return this;
}

//=============================================================================

YAHOO.extendX(Clipperz.PM.Components.RecordDetail.FieldButtonComponent, Clipperz.PM.Components.RecordDetail.AbstractFieldSubComponent, {

	'toString': function() {
		return "Clipperz.PM.Components.RecordDetail.FieldButtonComponent";
	},

	//-------------------------------------------------------------------------

	'buttonText': function() {
		var	result;

		if (this.recordField() == null) {
			//	TODO: this is never used. It is just an obsolete legacy chunk of code
			result = Clipperz.PM.Strings['recordDetailAddFieldButtonLabel'];
		} else {
			result = Clipperz.PM.Strings['recordDetailRemoveFieldButtonLabel'];
		}
		
		return result;
	},

	//-------------------------------------------------------------------------

	'button': function() {
		return this._button;
	},
	
	'setButton': function(aValue) {
		this._button = aValue;
	},
	
	//-------------------------------------------------------------------------

	'render': function() {
		this.element().update("");
		
		Clipperz.YUI.DomHelper.append(this.element().dom, {tag:'div', id:this.getId('button')})
		this.setButton(new YAHOO.ext.Button(this.getDom('button'), {text:this.buttonText(), handler:this.handleButtonClick, scope:this}));

		this.update();
	},

	//-------------------------------------------------------------------------

	'handleButtonClick': function() {
		if (this.recordField() == null) {
			this.mainComponent().addNewField();
		} else {
			this.mainComponent().removeField(this.fieldComponent());
		}
	},
	
	//-------------------------------------------------------------------------

	'updateEditMode': function() {
		this.button().show();
	},

	//-------------------------------------------------------------------------
	
	'updateViewMode': function() {
		this.button().hide();
	},

	//-------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"
});

