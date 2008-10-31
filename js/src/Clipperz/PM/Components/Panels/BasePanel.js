if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.PM) == 'undefined') { Clipperz.PM = {}; }
if (typeof(Clipperz.PM.Components) == 'undefined') { Clipperz.PM.Components = {}; }
if (typeof(Clipperz.PM.Components.Panels) == 'undefined') { Clipperz.PM.Components.Panels = {}; }

//var _Clipperz_PM_Components_Panels_base_id_ = 0;

//#############################################################################

Clipperz.PM.Components.Panels.BasePanel = function(anElement, args) {
	args = args || {};

    Clipperz.PM.Components.Panels.BasePanel.superclass.constructor.call(this, anElement, args);
	
	this._user = args.user || null;
	this._delegate = args.delegate || null;
	this._tabPanelController = null;
//	Clipperz.NotificationCenter.register(null, 'switchLanguage', this, 'switchLanguageHandler');

//	this._ids = {};

	return this;
}

//=============================================================================

YAHOO.extendX(Clipperz.PM.Components.Panels.BasePanel, Clipperz.PM.Components.BaseComponent, {

	'toString': function() {
		return "Clipperz.PM.Components.Panels.BasePanel component";
	},

	//-------------------------------------------------------------------------

	'user': function() {
		return this._user;
	},
	
	'setUser': function(aValue) {
		this._user = aValue;
	},

	//-------------------------------------------------------------------------

	'delegate': function() {
		return this._delegate;
	},
	
	'setDelegate': function(aValue) {
		this._delegate = aValue;
	},

	//-------------------------------------------------------------------------

	'tabPanelController': function() {
		return this._tabPanelController;
	},
	
	'switchLanguageHandler': function() {
//MochiKit.Logging.logDebug(">>> BasePanel.switchLanguageHandler [" + this.toString() + "]");
		this.render();
//MochiKit.Logging.logDebug("<<< BasePanel.switchLanguageHandler [" + this.toString() + "]");
	},
	
	//-------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"
	
});
