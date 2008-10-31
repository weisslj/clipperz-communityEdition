if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.YUI) == 'undefined') { Clipperz.YUI = {}; }


Clipperz.YUI.IBLayoutManager = function(container, config) {
	var regionName;
	var	element;
	
	config = config || {};
	
    Clipperz.YUI.IBLayoutManager.superclass.constructor.call(this, container);
    this.hideOnLayout = config.hideOnLayout || false;

	element = YAHOO.ext.Element.get(container);
	element.setStyle('position', 'absolute');
	element.setStyle('overflow', 'hidden');
	
	for (regionName in config.regions) {
		var newRegion;
		
		newRegion = new new Clipperz.YUI.IBLayoutRegion(this, regionName, config.regions[regionName]);
		this.addRegion(regionName, newRegion);
	}
	
	this.layout();
};

YAHOO.extendX(Clipperz.YUI.IBLayoutManager, YAHOO.ext.LayoutManager, {
	
	'toString': function() {
		return "IBLayoutManager (" + this.el.id + ")";
	},
	
	//-----------------------------------------------------

	'add': function(aName, aPanel) {
		var regionName;
		
        regionName = aName.toLowerCase();
        return this.regions[regionName].add(aPanel);
	},

	//-----------------------------------------------------
    
	'addRegion': function(aRegion) {
		var regionName;
		
		regionName = aRegion.name().toLowerCase();
		if (!this.regions[regionName]) {
//MochiKit.Logging.logDebug("--- adding region with name: " + aRegion.name());
			this.regions[regionName] = aRegion;
		} else {
			// ????
		}
		
		return aRegion;
	},

	//-----------------------------------------------------

	'getRegion': function(target){
		return this.regions[target.toLowerCase()];
	},
	
	//-----------------------------------------------------

	'layout': function(){
		var	region;

//MochiKit.Logging.logDebug(">>> IBLayoutManager.layout - regions: " + Clipperz.Base.serializeJSON(MochiKit.Base.keys(this.regions)));
		for (region in this.regions) {
//MochiKit.Logging.logDebug("--- IBLayoutManager.layout - region: " + region);
			this.regions[region].layout();
		}
//MochiKit.Logging.logDebug("<<< IBLayoutManager.layout");
	},
	
	//-----------------------------------------------------

	'getSize': function() {
		return this.el.getSize();
	},
    
	//-----------------------------------------------------
	__syntaxFix__: '__syntaxFix__'
});
