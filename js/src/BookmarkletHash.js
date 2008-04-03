//	18f820faffcdb5e847d4c5d5c4a1de6743baa1a0
//	9b30434c73fb009b15fecaa904b44f9ced807577
//	9b30434c73fb009b15fecaa904b44f9ced807577
var	xh;
var	documentText;

try {
	xh=new XMLHttpRequest();
} catch(e) {
	xh=new ActiveXObject("Msxml2.XMLHTTP");
}

xh.open("GET", window.location, false);
xh.send(null);
	
documentText = "#####" + xh.responseText + "####";
//documentText = document.body.innerHTML;

console.log(documentText);