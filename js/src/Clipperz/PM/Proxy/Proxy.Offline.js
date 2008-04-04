/*

Copyright 2008 Clipperz Srl

This file is part of Clipperz Community Edition.
Clipperz Community Edition is a web-based password manager and a
digital vault for confidential data.
For further information about its features and functionalities please
refer to http://www.clipperz.com

* Clipperz Community Edition is free software: you can redistribute
  it and/or modify it under the terms of the GNU Affero General Public
  License as published by the Free Software Foundation, either version
  3 of the License, or (at your option) any later version.

* Clipperz Community Edition is distributed in the hope that it will
  be useful, but WITHOUT ANY WARRANTY; without even the implied
  warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  See the GNU Affero General Public License for more details.

* You should have received a copy of the GNU Affero General Public
  License along with Clipperz Community Edition.  If not, see
  <http://www.gnu.org/licenses/>.


*/



if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.PM) == 'undefined') { Clipperz.PM = {}; }

//=============================================================================

Clipperz.PM.Proxy.Offline = function(args) {
	Clipperz.PM.Proxy.DWR.superclass.constructor.call(this, args);
	
	this._data = this.args().data || (typeof(_clipperz_dump_data_) != 'undefined' ? _clipperz_dump_data_ : null);
	this._b = null;
	this._B = null;
	this._A = null;
	this._userData = null;
	
	return this;
}

//Clipperz.PM.Proxy.Offline.prototype = MochiKit.Base.update(new Clipperz.PM.Proxy(), {
YAHOO.extendX(Clipperz.PM.Proxy.Offline, Clipperz.PM.Proxy, {

	'toString': function() {
		return "Clipperz.PM.Proxy.Offline";
	},

	//-------------------------------------------------------------------------

	'data': function() {
		return this._data;
	},

	//-------------------------------------------------------------------------

	'b': function() {
		return this._b;
	},

	'set_b': function(aValue) {
		this._b = aValue;
	},

	//-------------------------------------------------------------------------

	'B': function() {
		return this._B;
	},

	'set_B': function(aValue) {
		this._B = aValue;
	},

	//-------------------------------------------------------------------------

	'A': function() {
		return this._A;
	},

	'set_A': function(aValue) {
		this._A = aValue;
	},

	//-------------------------------------------------------------------------

	'userData': function() {
		return this._userData;
	},
	
	'setUserData': function(aValue) {
		this._userData = aValue;
	},

	//-------------------------------------------------------------------------

	'isTestData': function() {
		return (typeof(this.userData()['__masterkey_test_value__']) != 'undefined');
	},
	
	//-------------------------------------------------------------------------

	'userDetails': function() {
		var result;
		
		if (this.isTestData()) {
			var serializedHeader;
			var version;

//MochiKit.Logging.logDebug("### test data");
			version = this.userData()['userDetailsVersion'];
			serializedHeader = MochiKit.Base.serializeJSON(this.userData()['userDetails']);
			result = Clipperz.PM.Crypto.encryptingFunctions.versions[version].encrypt(this.userData()['__masterkey_test_value__'], serializedHeader);
		} else {
//MochiKit.Logging.logDebug("### NOT test data");
 			result = this.userData()['userDetails'];
		}
		
		return result;
	},
	
	'statistics': function() {
		var result;

		if (this.userData()['statistics'] != null) {
			if (this.isTestData()) {
				var serializedStatistics;
				var version;

				version = this.userData()['userDetailsVersion'];
				serializedStatistics = MochiKit.Base.serializeJSON(this.userData()['statistics']);
				result = Clipperz.PM.Crypto.encryptingFunctions.versions[version].encrypt(this.userData()['__masterkey_test_value__'], serializedStatistics);
			} else {
			 	result = this.userData()['statistics'];
			}
		} else {
			result = null;
		}
		
		return result;
	},
	
	//=========================================================================
/*
	'knock': function(someParameters) {
//MochiKit.Logging.logDebug("--- Proxy_Offline.knock");
		return MochiKit.Async.succeed();
	},
*/
	//=========================================================================
/*
	'registrationPrelude': function(someParameters, aCallback) {
	},
*/
	//-------------------------------------------------------------------------

	'registration': function(someParameters, aCallback) {
	},
	
	//=========================================================================

	'handshake': function(someParameters) {
		var result;

		result = {};
		
//MochiKit.Logging.logDebug(">>> Proxy_Offline.handshake - this: " + this);
//MochiKit.Logging.logDebug("--- Proxy_Offline.handshake - someParameters: " + MochiKit.Base.serializeJSON(someParameters));
		if (someParameters.message == "connect") {
//{"message":"connect", "version":"0.2", "parameters":{"C":"9a984e219b07f9b645ef35f4de938b4741abe2e0b4adc88b40e9367170c91cc8", "A":"d44f486b5fc80354413d34442fd2559e23a9e68455619f76bdfc7ae3b1443a24"}}
			var userData;
			var randomBytes;
			var b, B, v;

			userData = this.data()['users'][someParameters.parameters.C];
			
			if ((typeof(userData) != 'undefined') && (userData['version'] == someParameters.version)) {
				this.setUserData(userData);
			} else {
				this.setUserData(this.data()['users']['catchAllUser']);
			}

			randomBytes = Clipperz.Crypto.Base.generateRandomSeed();
			this.set_b(new Clipperz.Crypto.BigInt(randomBytes, 16));
			v = new Clipperz.Crypto.BigInt(this.userData()['v'], 16);
			this.set_B(v.add(Clipperz.Crypto.SRP.g().powerModule(this.b(), Clipperz.Crypto.SRP.n())));
			
			this.set_A(someParameters.parameters.A);
			
			result['s'] = this.userData()['s'];
			result['B'] = this.B().asString(16);
		} else if (someParameters.message == "credentialCheck") {
//{"message":"credentialCheck", "version":"0.2", "parameters":{"M1":"bc7a12e4986bb1c5e2a057d50fe519a75ec70d22eebec64a174889e46756ade3"}}
			var v, u, S, A, K, M1;
			
			v = new Clipperz.Crypto.BigInt(this.userData()['v'], 16);
			u = new Clipperz.Crypto.BigInt(Clipperz.PM.Crypto.encryptingFunctions.versions[someParameters.version].hash(new Clipperz.ByteArray(this.B().asString(10))).toHexString(), 16);
			A = new Clipperz.Crypto.BigInt(this.A(), 16);
			S = (A.multiply(v.powerModule(u, Clipperz.Crypto.SRP.n()))).powerModule(this.b(), Clipperz.Crypto.SRP.n());
			K = Clipperz.PM.Crypto.encryptingFunctions.versions[someParameters.version].hash(new Clipperz.ByteArray(S.asString(10))).toHexString().slice(2);

			M1 = Clipperz.PM.Crypto.encryptingFunctions.versions[someParameters.version].hash(new Clipperz.ByteArray(A.asString(10) + this.B().asString(10) + K)).toHexString().slice(2);
			if (someParameters.parameters.M1 == M1) {
				var M2;
				
				M2 = Clipperz.PM.Crypto.encryptingFunctions.versions[someParameters.version].hash(new Clipperz.ByteArray(A.asString(10) + someParameters.parameters.M1 + K)).toHexString().slice(2);
				result['M2'] = M2;
			} else {
				throw new Error("Client checksum verification failed! Expected <" + M1 + ">, received <" + someParameters.parameters.M1 + ">.", "Error");
			}
		} else {
			MochiKit.Logging.logError("Clipperz.PM.Proxy.Test.handshake - unhandled message: " + someParameters.message);
		}
		
//MochiKit.Logging.logDebug("<<< Proxy_Offline.handshake: " + MochiKit.Base.serializeJSON(result));
		return MochiKit.Async.succeed(result);
	},

	//-------------------------------------------------------------------------

	'message': function(someParameters) {
		var result;

		result = {};
		
//MochiKit.Logging.logDebug(">>> Proxy_Offline.message: " + MochiKit.Base.serializeJSON(someParameters));
		if (someParameters.message == 'getUserDetails') {
			result['header'] =  this.userDetails();
			result['statistics'] = this.statistics();
			result['maxNumberOfRecords'] = this.userData()['maxNumberOfRecords'];
			result['version'] = this.userData()['userDetailsVersion'];
		} else if (someParameters.message == 'upgradeUserCredentials') {
//DEBUG: >>> Proxy_Offline.message: {"message":"upgradeUserCredentials", "parameters":{"C":"f53788056f54b4458e43992ffbe32c2376d4fcab11ae9ac461ab7b73f1a8a1c9", "s":"eac25a03729b7552bf8776773f9262aa4a58268e7361b839d46451fce53b913c", "v":"80a004c624f019b7f28950f83f55e7980ac64d6cca097b16b288540f57f35ee5", "version":"0.2"}}			
			result['result'] = "done";
		} else if (someParameters.message == 'getRecordDetail') {
			var	recordData;
			var currentVersionData;
			
			recordData = this.userData()['records'][someParameters['parameters']['reference']];
//MochiKit.Logging.logDebug("#### record: " + MochiKit.Base.serializeJSON(recordData));
			result['reference'] = someParameters['parameters']['reference'];
			result['data'] = recordData['data'];
			result['version'] = recordData['version'];
			result['creationData'] = recordData['creationDate'];
			result['updateDate'] = recordData['updateDate'];
			result['accessDate'] = recordData['accessDate'];

			currentVersionData = recordData['versions'][recordData['currentVersion']];
//MochiKit.Logging.logDebug("### currentVersionData: " + MochiKit.Base.serializeJSON(currentVersionData));
//{"header":"####", "data":"7fdc57a2bc3a231cfce5d0b76e45fbc53003e3eb2e8040d457cb79dec394d4b0ee479050d5172448aa7fb373dede274259b75b53cee288a4757ef0820f879066618f8efe0093f53071f5b57a4537bde0f5401f70b23e4711acb657e6e4ae4c5f1cbb61e2dd919d1c32b65293b023a26e557f0766fa2a1eb2f1e4b99880464664cc69760701c963e0d247094503856843d326f7daafd7df6af8ced74a28336dbc33fb9feff2a7365076f0767b717a61651f1e5fca58aae745a99479008c6030d0c33032a8ce7dfef92a727495083f4b0348e44d2e08dd6f53d425ffc32e383e769ebfbc52849299a112877cc9853e60b1934b74a340c54d66aa5768478841183abe8c118101a6e9b70477174379f4ee83a582bbb7733a1f38cfc0ec00cd0287539bf442d9e4b0cf1c8b846d4055a37ca0d10faaf0cbab312c2d6de69b7c1193c9c86f07bfe128fbdce8d64c610842adc95f4596d8afec35057a04f9853a0974ba9d568d23dee319dffdd7979658da3c8fac70a533e0fd35869d00d2ce9fd26a3611bebe9e7a976864399c2ea237f16d2ec012092959ca37411f250f323ac1d4238894f579647620fcace93708531488b5eca6e93bbac054d87f55c4fe8da0d655d098211883901c94867c37071fd3372a399e45f4a119233be90c5d36ca3b85da60d2c996afef1ffa4d488b23b7d4ddfca58a08454f8b86f8db6b75730cf83a09395468bde855d2a320a4f0fadc79ce2cdaf92c0983905e4534a85851613ca2700ea85f19a8cdc2dd58ff0bcfe934b4e744ca6355b3160fe92c1c2c9fd22316bee38e88cbb76d894734d5d57dfbd5e9da91343a66b8ed42261b0c649da3d11ccab23c4812934fb00d97f6dde4c45e7645e2bc54c92ca8dd0ccc41ba15e63ae098f279dab0d0fa071f99fbce2202a4fd4d31d438c4f84f2729b7b34449f8f11e164d599bb5a91a9d013fa7bc99422c21be831bf9bf46becd63564c93ec164df68bda9aa3331b7b1dcb385f1dbfa419ceae4f2e8cea5347ee79da6158e6695ef7bc9daf461b01692c99d631ca66fd8a48085deb9bd41a0b0aca851ea347997a51807201421dd6bc8165261a29d145604a40e31400834dc2e988abe23a0c9154aaf1b927e0b22eedf5972d6edb8070710ce93e9d12047ab70c38b4ed2679aee32c59462ad0c0845dffc3ce7c8fc5d5103e420a4edb34a6f08d8db0817b1d1680d8aabadb955156b8da8f19556a8bbe5515d7714955798548a26e77ce8f3b17de9fb55d4e84fdea3d8f41dc5f789f11ffef1b6ff4352e99e6cfde5c72c1357db4425a2b328f60393d03595d9d9dd0d6b05831a45af20e07048a7804042db4d5da2bafb2d3899b6d6c11b1c37ec4a931feb1a93b240715927ddb1eccf4d5f5999a35808eb7ca983cbafbe796ba6d86a7bb14d3df1e50749aa721585a46da8d115f28235344370374ebdad754c2f48815f493cf129cfca2c10889150160368b20465f2f2816c2e39f2e068282ff003c883fe2fd0d1ea49559b59985bfcd3d73e2e39a9056dbe9a3438e68a63458b65a51a7039ea003cdf90cf87aa8c707f31449cc6b30458a2671cb7cf92ebd47d57120c389eb5cff34d3e243769fc3d0c3d1074156ca0dcd7f2068b97b522dc8ab328f1f693fb5f9cc11726d5b79a57607a5e97a8af90bc7c254de703aa71fda9716e28bcdb229b22276c7d827ceecd5898b1a24f2adbb72bbb1b8af8846b54f52da44e6615b4efe27900f0116cd57692829a7c1a694a87e338320de2a6d6e96d4df2fbf44043f7b6f2a1cc5275608aff2c8a0d20d4d1b789b116ec0c60439b7553b0a033d5478704e519a0cb814eabe499e26f0c0f7d41c08132c66a2492b1f028e806d7848d8650ad41b7991fa3d427dd97a5fc2a090a9f86905f54b77a6525cf8ea9315462734ddf95b95271f23ab8345e5d5ba8629b13de3214434af48a9d860fb4e124cc61b6c66ecbffccde38c9e8259d5cf685ae77f2f1e689c29444c624f4b0345e0", "version":"0.1", "creationDate":"Mon Aug 28 12:16:56 CEST 2006", "updateDate":"Mon Oct 23 11:22:15 CEST 2006", "accessDate":"Thu Feb 01 11:29:27 CET 2007"}			result['currentVersion'] = {};
			result['currentVersion'] = {};
			result['currentVersion']['reference'] = recordData['currentVersion'];
			result['currentVersion']['version'] = currentVersionData['version'];
			result['currentVersion']['header'] = currentVersionData['header'];
			result['currentVersion']['data'] = currentVersionData['data'];
			result['currentVersion']['creationData'] = currentVersionData['creationDate'];
			result['currentVersion']['updateDate'] = currentVersionData['updateDate'];
			result['currentVersion']['accessDate'] = currentVersionData['accessDate'];
			if (typeof(currentVersionData['previousVersion']) != 'undefined') {
				result['currentVersion']['previousVersionKey'] = currentVersionData['previousVersionKey'];
				result['currentVersion']['previousVersion'] = currentVersionData['previousVersion'];
			}
//DEBUG: >>> Proxy_Offline.message: {"message":"getRecordDetail", "parameters":{"reference":"1cef440eecea59f47554aa04b94e18c1d9fc761246b911f89a7da72d544cac48"}}			
		} else {
//MochiKit.Logging.logDebug(">>> Proxy_Offline.message: " + MochiKit.Base.serializeJSON(someParameters));
			MochiKit.Logging.logError("Clipperz.PM.Proxy.Test.message - unhandled message: " + someParameters.message);
		}
	
//MochiKit.Logging.logDebug("<<< Proxy_Offline.message: " + MochiKit.Base.serializeJSON(result));
		return MochiKit.Async.succeed(result);
	},

	//=========================================================================

	'logout': function(someParameters) {
		return MochiKit.Async.succeed();
	},

	//=========================================================================

	'isReadOnly': function() {
		return true;
	},

	//=========================================================================
	__syntaxFix__: "syntax fix"
	
});

//=============================================================================
