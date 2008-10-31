
if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.YUI) == 'undefined') { Clipperz.YUI = {}; }

//	found on YUI-EXT forum (http://www.yui-ext.com/forum/viewtopic.php?t=683&highlight=accordion)
Clipperz.YUI.Collapser = function(clickEl, collapseEl, initiallyCollapsed) { 
	this.clickEl = getEl(clickEl); 
	this.collapseEl = getEl(collapseEl); 
	this.clickEl.addClass('collapser-expanded'); 
	if (initiallyCollapsed == true) {
		this.afterCollapse();
	}
	this.clickEl.mon('click', function(){ 
		this.collapsed === true ? this.expand() : this.collapse(); 
	}, this, true); 
}; 

Clipperz.YUI.Collapser.prototype = { 
	'collapse': function(){ 
		this.collapseEl.clip(); 
		this.collapseEl.setHeight(1, true, .35, this.afterCollapse.createDelegate(this), YAHOO.util.Easing.easeOut); 
		this.clickEl.replaceClass('collapser-expanded','collapser-collapsed'); 
	}, 

	'afterCollapse': function(){ 
		this.collapsed = true; 
		this.collapseEl.setDisplayed(false); 
		this.clickEl.replaceClass('collapser-expanded','collapser-collapsed'); 
	}, 

	'expand': function(){ 
		this.collapseEl.setDisplayed(true); 
		this.collapseEl.autoHeight(true, .35, this.afterExpand.createDelegate(this), YAHOO.util.Easing.easeOut); 
		this.clickEl.replaceClass('collapser-collapsed','collapser-expanded'); 
	}, 

	'afterExpand': function(){ 
		this.collapsed = false; 
		this.collapseEl.unclip(); 
		this.collapseEl.setStyle('height', '');    
		this.clickEl.replaceClass('collapser-collapsed','collapser-expanded'); 
	},

	//-----------------------------------------------------
	__syntaxFix__: '__syntaxFix__'
};
