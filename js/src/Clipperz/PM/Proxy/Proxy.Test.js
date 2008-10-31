if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.PM) == 'undefined') { Clipperz.PM = {}; }
if (typeof(Clipperz.PM.Proxy) == 'undefined') { Clipperz.PM.Proxy = {}; }

//=============================================================================

Clipperz.PM.Proxy.Test = function(args) {
	args = args || {};

	Clipperz.PM.Proxy.Offline.call(this, args);

	
	
	return this;
}

Clipperz.PM.Proxy.Test.prototype = MochiKit.Base.update(new Clipperz.PM.Proxy.Offline(), {

	'toString': function() {
		return "Clipperz.PM.Proxy.Test";
	},

	//-------------------------------------------------------------------------

	'isTestData': function() {
		return typeof(this.userData()['__masterkey_test_value__'] != 'undefined');
	},
	
	//-------------------------------------------------------------------------

	'userDetails': function() {
		var result;

		if (this.isTestData()) {
			var serializedHeader;
			var version;
		
			version = this.userData()['version'];
			serializedHeader = Clipperz.Base.serializeJSON(this.userData()['userDetails']);
			result = Clipperz.PM.Crypto.encryptingFunctions.versions[version].encrypt(this.userData()['__masterkey_test_value__'], serializedHeader);
		} else {
			result = Clipperz.PM.Proxy.Offline.prototype.userDetails.call(this);
		}
		
		return result;
	},
	
	//-------------------------------------------------------------------------

	'statistics': function() {
		var result;
		var serializedStatistics;
		var version;
		
		version = this.userData()['version'];
		serializedStatistics = Clipperz.Base.serializeJSON(this.userData()['statistics']);
		result = Clipperz.PM.Crypto.encryptingFunctions.versions[version].encrypt(this.userData()['__masterkey_test_value__'], serializedStatistics);
		
		return result;
	},
	
	//-------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"
	
});

