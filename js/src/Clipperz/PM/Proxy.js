if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.PM) == 'undefined') { Clipperz.PM = {}; }

//=============================================================================

Clipperz.PM.Proxy = function(args) {
	this._args = args || {};
//	args = args || {};

	return this;
}

Clipperz.PM.Proxy.prototype = MochiKit.Base.update(null, {

	'toString': function() {
		return "Clipperz.PM.Proxy";
	},

	//-------------------------------------------------------------------------

	'args': function() {
		return this._args;
	},
	
	//=========================================================================
/*
	'knock': function(someParameters) {
		throw Clipperz.Base.exception.AbstractMethod;
	},
*/
	//=========================================================================
/*
	'registrationPrelude': function(someParameters) {
		throw Clipperz.Base.exception.AbstractMethod;
	},
*/
	//-------------------------------------------------------------------------

	'registration': function(someParameters) {
		throw Clipperz.Base.exception.AbstractMethod;
	},
	
	//=========================================================================

	'handshake': function(someParameters) {
		throw Clipperz.Base.exception.AbstractMethod;
	},

	//=========================================================================

	'message': function(someParameters) {
		throw Clipperz.Base.exception.AbstractMethod;
	},

	//=========================================================================

	'logout': function(someParameters) {
		throw Clipperz.Base.exception.AbstractMethod;
	},

	//=========================================================================

	'isReadOnly': function() {
		throw Clipperz.Base.exception.AbstractMethod;
	},
	
	//=========================================================================
	__syntaxFix__: "syntax fix"
	
});

//=============================================================================
