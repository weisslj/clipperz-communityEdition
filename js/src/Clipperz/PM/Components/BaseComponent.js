if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.PM) == 'undefined') { Clipperz.PM = {}; }
if (typeof(Clipperz.PM.Components) == 'undefined') { Clipperz.PM.Components = {}; }

//#############################################################################

var _Clipperz_PM_Components_Panels_base_id_ = 0;

//#############################################################################

Clipperz.PM.Components.BaseComponent = function(anElement, args) {
	args = args || {};
//	MochiKit.Base.bindMethods(this);
//	Clipperz.PM.Components.BaseComponent.superclass.constructor.call(this, args);

	this._element = anElement;
	this._ids = {};
	
	return this;
}

//=============================================================================

//MochiKit.Base.update(Clipperz.PM.Components.BaseComponent.prototype, {
YAHOO.extendX(Clipperz.PM.Components.BaseComponent, YAHOO.ext.util.Observable, {

	'isClipperzPMComponent': true,
	
	//-------------------------------------------------------------------------

	'toString': function () {
		return "Clipperz.PM.Components.BaseComponent component";
	},

	//-------------------------------------------------------------------------

	'domHelper': function() {
		return Clipperz.YUI.DomHelper;
	},
	
	//-------------------------------------------------------------------------

	'element': function() {
//MochiKit.Logging.logDebug(">>> BaseComponent.element");
		return this._element;
	},
	
	'setElement': function(aValue) {
		this._element = aValue;
	},

	//-----------------------------------------------------

	'remove': function() {
//MochiKit.Logging.logDebug(">>> BaseComponent.remove");
		Clipperz.NotificationCenter.unregister(this);
		MochiKit.Signal.disconnectAllTo(this);
//MochiKit.Logging.logDebug("<<< BaseComponent.remove");
	},
	
	//-------------------------------------------------------------------------

	'getId': function(aValue) {
		var	result;
		
		result = this._ids[aValue];
		
		if (typeof(result) == 'undefined') {
			_Clipperz_PM_Components_Panels_base_id_ ++;
			
			result = "Clipperz_PM_Components_Panels_" + aValue + "_" + _Clipperz_PM_Components_Panels_base_id_;
			this._ids[aValue] = result;
//MochiKit.Logging.logDebug(">>> getId(" + aValue + ") = " + result);
		} else {
//MochiKit.Logging.logDebug("<<< getId(" + aValue + ") = " + result);
		}
	
		return result;
	},

	'getDom': function(aValue) {
		return YAHOO.util.Dom.get(this.getId(aValue));
	},
	
	'getElement': function(aValue) {
		return YAHOO.ext.Element.get(this.getId(aValue));
	},
	
	'getActor': function(aValue, anAnimator) {
 		return new YAHOO.ext.Actor(this.getDom(aValue), anAnimator);
	},
	
	//-------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"
	
});
