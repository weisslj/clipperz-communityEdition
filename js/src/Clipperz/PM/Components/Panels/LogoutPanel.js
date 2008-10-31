if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.PM) == 'undefined') { Clipperz.PM = {}; }
if (typeof(Clipperz.PM.Components) == 'undefined') { Clipperz.PM.Components = {}; }
if (typeof(Clipperz.PM.Components.Panels) == 'undefined') { Clipperz.PM.Components.Panels = {}; }

//#############################################################################

Clipperz.PM.Components.Panels.LogoutPanel = function(args) {
	args = args || {};

    Clipperz.PM.Components.Panels.LogoutPanel.superclass.constructor.call(this, args);

	return this;
}

//=============================================================================

YAHOO.extendX(Clipperz.PM.Components.Panels.LogoutPanel, Clipperz.PM.Components.Panels.BasePanel, {

	'toString': function() {
		return "Clipperz.PM.Components.LogoutPanel component";
	},
	
	//-------------------------------------------------------------------------

	'initPanel': function() {
		var result;
		var	layout;
			
		result = new YAHOO.ext.ContentPanel(this.getId('panel'), {title:'logout', closable:false, autoCreate:true});

		Clipperz.YUI.DomHelper.append(result.getEl().dom,
			{tag:'div', children:[
				{tag:'h2', html:'Logout panel'}
			]}
		);
		
		return result;
	},
	
	//-------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"
	
});
	
