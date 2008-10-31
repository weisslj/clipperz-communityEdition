try { if (typeof(Clipperz.ByteArray) == 'undefined') { throw ""; }} catch (e) {
	throw "Clipperz.Crypto.ECC depends on Clipperz.ByteArray!";
}  
if (typeof(Clipperz.Crypto.ECC) == 'undefined') { Clipperz.Crypto.ECC = {}; }
if (typeof(Clipperz.Crypto.ECC.BinaryField) == 'undefined') { Clipperz.Crypto.ECC.BinaryField = {}; }

Clipperz.Crypto.ECC.BinaryField.Point = function(args) {
	args = args || {};
	this._x = args.x;
	this._y = args.y;
	
	return this;
}

Clipperz.Crypto.ECC.BinaryField.Point.prototype = MochiKit.Base.update(null, {

	'asString': function() {
		return "Clipperz.Crypto.ECC.BinaryField.Point (" + this.x() + ", " + this.y() + ")";
	},

	//-----------------------------------------------------------------------------

	'x': function() {
		return this._x;
	},
	
	'y': function() {
		return this._y;
	},

	//-----------------------------------------------------------------------------

	'isZero': function() {
		return (this.x().isZero() && this.y().isZero())
	},
	
	//-----------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"
});
