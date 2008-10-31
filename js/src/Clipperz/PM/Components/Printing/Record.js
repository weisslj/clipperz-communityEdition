if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.PM) == 'undefined') { Clipperz.PM = {}; }
if (typeof(Clipperz.PM.Components) == 'undefined') { Clipperz.PM.Components = {}; }
if (typeof(Clipperz.PM.Components.Printing) == 'undefined') { Clipperz.PM.Components.Printing = {}; }

Clipperz.PM.Components.Printing.Record = function(args) {
	args = args || {};

	this._record = args['record'];

	return this;
}

MochiKit.Base.update(Clipperz.PM.Components.Printing.Record.prototype, {

	'record': function() {
		return this._record;
	},

	//-------------------------------------------------------------------------

	'deferredDrawToWindow': function(aWindow) {
		var	deferredResult;
		
		deferredResult = new MochiKit.Async.Deferred();
		deferredResult.addCallback(MochiKit.Base.method(this.record(), 'deferredData'));
		deferredResult.addCallback(MochiKit.Base.method(this, 'appendToWindow', aWindow));
		deferredResult.callback();
		return deferredResult;
	},

	//-------------------------------------------------------------------------

	'appendToWindow': function(aWindow) {
		MochiKit.DOM.withWindow(aWindow, MochiKit.Base.bind(function() {
			var newBlock;
			var fields;
			
			fields = MochiKit.Base.concat(
				MochiKit.Base.map(MochiKit.Base.bind(function(aField) {
					var result;
					var dt, dd;
					var label, value;
					
					label = aField.label();
					value = aField.value();
					dt = MochiKit.DOM.createDOM('DT', null, label);
					dd = MochiKit.DOM.createDOM('DD', null, value)
					result = [dt, dd];

					return result
				}, this), MochiKit.Base.values(this.record().currentVersion().fields()))
			);

			newBlock = MochiKit.DOM.DIV({'class': 'recordBlock'},
				MochiKit.DOM.H2(null, this.record().label()),
				MochiKit.DOM.DIV({'class': 'recordNotes'}, MochiKit.Base.map(MochiKit.Base.partial(MochiKit.DOM.P, null), this.record().notes().split("\n"))),
				MochiKit.DOM.createDOM('DL', null, fields)
			);
			MochiKit.DOM.appendChildNodes(MochiKit.DOM.currentDocument().body, newBlock);
			
		}, this));
	},
	
	//-------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"
});
