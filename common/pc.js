/**
 * 适配pc端
 * */
;(function (){
	var u = navigator.userAgent,
		w = window.innerWidth;
	if (!u.match(/AppleWebKit.*Mobile.*/) || u.indexOf('iPad') > -1) {
		console.log("u.match(/AppleWebKit.*Mobile.*/) || u.indexOf('iPad')")
		window.innerWidth = 750*(w / 1920);
		window.onload = function() {
			window.innerWidth = w;
			document.documentElement.style.fontSize = 16 + 'px';
		}
	}
})();