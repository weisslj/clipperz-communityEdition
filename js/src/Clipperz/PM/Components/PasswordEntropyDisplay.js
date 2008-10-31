if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.PM) == 'undefined') { Clipperz.PM = {}; }
if (typeof(Clipperz.PM.Components) == 'undefined') { Clipperz.PM.Components = {}; }

Clipperz.PM.Components.PasswordEntropyDisplay = function(anElement, args) {
	args = args || {};

//MochiKit.Logging.logDebug(">>> new TextFormField");
	Clipperz.PM.Components.PasswordEntropyDisplay.superclass.constructor.call(this, anElement, args);

	this._wrapperElement = null;
	this._entropyElement = null;

	this.render();
//MochiKit.Logging.logDebug("<<< new TextFormField");
	
	return this;
};

YAHOO.extendX(Clipperz.PM.Components.PasswordEntropyDisplay, Clipperz.PM.Components.BaseComponent, {
	
	'toString': function() {
		return "Clipperz.PM.Components.PasswordEntropyDisplay";
	},

	//-----------------------------------------------------

	'wrapperElement': function() {
		return this._wrapperElement;
	},
	
	'setWrapperElement': function(aValue) {
		this._wrapperElement = aValue;
	},
	
	//-----------------------------------------------------

	'passwordElement': function() {
		return this.element();
	},
	
	//-----------------------------------------------------

	'entropyElement': function() {
		return this._entropyElement;
	},
	
	'setEntropyElement': function(aValue) {
		this._entropyElement = aValue;
	},

	//-----------------------------------------------------

	'render': function() {
		MochiKit.Signal.disconnectAllTo(this);

		this.setWrapperElement(this.element().wrap({tag:'div'}));
		this.setEntropyElement(Clipperz.YUI.DomHelper.append(this.wrapperElement().dom, {tag:'div', cls:'passwordEntropy', html:"&nbsp;"}, true));

//		this.entropyElement().setWidth(this.passwordElement().getWidth());
		this.updateEntropyElement();
		
		MochiKit.Signal.connect(this.element().dom, 'onkeyup', this, 'updateEntropyElement');
		MochiKit.Signal.connect(this.element().dom, 'onchange', this, 'updateEntropyElement');
		MochiKit.Signal.connect(this.element().dom, 'onblur', this, 'updateEntropyElement');
	},

	//-----------------------------------------------------

	'computeEntropyForString': function(aValue) {
		return Clipperz.PM.Crypto.passwordEntropy(aValue);
	},

	//-----------------------------------------------------

	'updateEntropyElement': function(anEvent) {
//MochiKit.Logging.logDebug(">>> PasswordEntropyDisplay.updateEntropyElement");
		var	maxExtent;
		var	entropy;
		
		entropy = Math.min(128, this.computeEntropyForString(this.passwordElement().dom.value));
//MochiKit.Logging.logDebug("--- PasswordEntropyDisplay.updateEntropyElement - entropy: " + entropy);
		this.entropyElement().setStyle('background-position', "0px " + -entropy + "px");
		this.entropyElement().setWidth(this.passwordElement().getWidth() * (entropy/128));
//MochiKit.Logging.logDebug("<<< PasswordEntropyDisplay.updateEntropyElement");
	},
	
	//-----------------------------------------------------
	__syntaxFix__: '__syntaxFix__'
});
