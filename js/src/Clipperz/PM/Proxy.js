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
