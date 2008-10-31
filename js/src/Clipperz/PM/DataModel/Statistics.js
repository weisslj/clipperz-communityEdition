if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.PM) == 'undefined') { Clipperz.PM = {}; }
if (typeof(Clipperz.PM.DataModel) == 'undefined') { Clipperz.PM.DataModel = {}; }


//#############################################################################

Clipperz.PM.DataModel.Statistics = function(args) {
	args = args || {};

	this._user = args.user;
	this._data = args.data || null;

	return this;
}

Clipperz.PM.DataModel.Statistics.prototype = MochiKit.Base.update(null, {

	//-------------------------------------------------------------------------

	'decrypt': function(aVersion, someEncryptedData) {
		var deferredResult;

//MochiKit.Logging.logDebug(">>> Statistics.decrypt");
		if (someEncryptedData == Clipperz.PM.Crypto.nullValue) {
			this.setData({});
			deferredResult = MochiKit.Async.succeed(this.data());
		} else {
			var	statistic;
			var user;
		
			statistic = this;
			user = this.user();
			deferredResult = new MochiKit.Async.Deferred();
//deferredResult.addCallback(function() { console.time("Statistics.decrypt.deferredDecrypt")});
			deferredResult.addCallback(Clipperz.PM.Crypto.deferredDecrypt, user.passphrase(), someEncryptedData, aVersion);
//deferredResult.addCallback(function() { console.timeEnd("Statistics.decrypt.deferredDecrypt")});
//deferredResult.addCallback(function() { console.time("Statistics.decrypt.setup")});
			deferredResult.addCallbacks(
				MochiKit.Base.partial(function (aStatistic, someData) {
					aStatistic.setData(someData);
					return aStatistic.data();
				}, statistic),
				MochiKit.Base.partial(function (aStatistic) {
					MochiKit.Logging.logWarning("resetting user statistics due to an error while decrypting stored data");
					aStatistic.setData({});
					return aStatistic.data();
				}, statistic)
			);
//deferredResult.addCallback(function() { console.timeEnd("Statistics.decrypt.setup")});

			deferredResult.callback();
		}
//MochiKit.Logging.logDebug("<<< Statistics.decrypt");
		
		return deferredResult;
	},

	//-------------------------------------------------------------------------

	'user': function() {
		return this._user;
	},
	
	//-------------------------------------------------------------------------

	'data': function() {
		return this._data;
	},
	
	'setData': function(aValue) {
		this._data = aValue;
		
		this.extractInfoFromData(aValue);
	},

	//-------------------------------------------------------------------------

	'extractInfoFromData': function(someValues) {
		
	},
	
	//-------------------------------------------------------------------------

	'encryptedData': function() {
		return Clipperz.PM.Crypto.deferredEncryptWithCurrentVersion(this.user().passphrase(), this.serializedData());
	},

	//-------------------------------------------------------------------------
	
	'serializedData': function() {
		var result;
		
//MochiKit.Logging.logDebug(">>> Statistics.serializedData");
		result = {};
//MochiKit.Logging.logDebug("<<< Statistics.serializedData");

		return result;
	},
	
	//-------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"
	
});

