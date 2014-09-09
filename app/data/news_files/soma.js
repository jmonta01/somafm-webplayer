/* Site wide JS file */

function SendMail(WhichDj, Server)
{
window.window.location="mailto:" + WhichDj + "@" + "SomaFM.com";
}

if (top !== self && document.referrer.match(/digg\.com\/\w{1,8}/)) {
  top.location.replace(self.location.href);
}


function OldpopUpPlayer(Channel) {
	URL="/popup/?" + Channel;
	newwindow=window.open(URL,'SomaPlayer','toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=410,height=220,left = 200,top = 140');
	if (window.focus) {newwindow.focus()}
	
}

function popUpPlayer(Channel) {
	URL="/popup/?" + Channel;
	ChannelURL="/" + Channel;
	newwindow=window.open(URL,'SomaPlayer','toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=410,height=260,left = 0,top = 0');
	window.location.href = ChannelURL;
	if (window.focus) {newwindow.focus()}
	
}

function isIE() {
	return '\v'=='v';
}
