
function mlbox() {
	var id = typeof mlbox_dir!=='undefined'?mlbox_dir:'images/',
	fc = typeof mlbox_fc!=='undefined'?mlbox_fc:'black',
	bc = typeof mlbox_bg!=='undefined'?mlbox_bg:'white',
	z = 1000,
	fa = ['.php4','.php5','.php6','.php','.htm','.html','.txt','.asp','.aspx'],
	bg, pg, ct, im, ok, el, ms6 = false, ms = false, dt = document,
	cm = dt.compatMode.toLowerCase().indexOf('back'),
	dh = (cm==-1?dt.documentElement.scrollHeight:dt.body.scrollHeight),
	dw = (cm==-1?dt.documentElement.scrollWidth:dt.body.scrollWidth),
	wh = (cm==-1?dt.documentElement.clientHeight:dt.body.clientHeight),
	ww = (cm==-1?dt.documentElement.clientWidth:dt.body.clientWidth),
	isOpera = !!window.opera||navigator.userAgent.indexOf(' OPR/')>=0,
	isChrome = !!window.chrome && !isOpera;


	function init() {
		for(var i in dt.links)
			if(dt.links[i].className && dt.links[i].href && dt.links[i].className.match(/(^|\s)mlbox($|\[|\s)/) && dt.links[i].onclick==null) dt.links[i].onclick = mlbox.load;
		pg = dt.createElement('img');
		pg.setAttribute('src', id+'ml_load.gif');
		with(pg.style) {
			position = 'absolute';
			backgroundColor = bc;
			display = 'none';
			zIndex = z+1;
		}
		dt.body.appendChild(pg);
		pg.onclick = mlbox.die;
	}

	mlbox.load = function() {
		if(el) return!1;
		var bd = dt.body;
		if(ms6){var s=bd.getElementsByTagName('select');for(var i=0;i<s.length;i++)s[i].style.visibility='hidden';}
		el = this;
		if(arguments[0] && arguments[0].length > 0) {
			el = document.createElement('a');
			el.setAttribute('href', arguments[0]);
		}
		var mh = dh;
		if(wh > mh) mh = wh;
		bg = dt.createElement('div');
		with(bg.style) {
			top = 0;
			left = 0;
			position = 'absolute';
			width = dw+'px';
			height = mh+'px';
			backgroundColor = 'black';
			opacity = '0.7';
			zIndex = z;
		}
		if(ms) {
			bg.style.filter = 'alpha(opacity=70)';
			bg.style.msFilter = 'alpha(opacity=70)';
		}
		bd.insertBefore(bg, pg);
		with(pg.style) {
			top = (Math.round((wh-pg.offsetHeight-40)/2)+st())+'px';
			left = (Math.round((ww-pg.offsetWidth-40)/2)+sl())+'px';
			padding = '20px';
			display = 'block';
		}
		pre();
		return!1;
	}

	mlbox.die = function() {
		if(bg) {
			var bd = dt.body;
			bd.removeChild(bg);
			bg = null;
			if(ct) {
				bd.removeChild(ct);
				ct = null;
				im = null;
			}
			if(im) {
				bd.removeChild(im);
				im = null;
			}
			if(ms6){var s=dt.getElementsByTagName('select');for(var i=0;i<s.length;i++)s[i].style.visibility='';}
			pg.style.display = 'none';
			el = null;
			dt.onkeydown = ok;
		}
	}

	function shw() {
		if(el && im) {
			bg.onclick = mlbox.die;
			ct = dt.createElement('div');
			with(ct.style) {
				position = 'fixed';
				backgroundColor = bc;
				padding = '20px';
				visibility = 'hidden';
				zIndex = z+2;
			}
			if(ms6) ct.style.position = 'absolute';
			dt.body.insertBefore(ct, pg);
			ct.appendChild(im);
			var cty = Math.round((wh - ct.offsetHeight)/2);
			if(ms6) cty += this.st();
			if(cty < 0 && !ms6) {
				ct.style.position = 'absolute';
				st() > Math.abs(cty) ? cty += st() : cty = 0;
			}
			var ctx = Math.round((ww-ct.offsetWidth)/2)+sl();
			if(ctx < 0) {
				ctx = 0;
				ct.style.position = 'absolute';
			}
			ct.style.top = cty+'px';
			ct.style.left = ctx+'px';
			var mh = dh;
			if(wh > mh) mh = wh;
			bg.style.height = mh+'px';
			bg.style.width = ww+'px';

			if(el.getAttribute('title') && el.getAttribute('title').length > 0) {
				var s = dt.createElement('p');
				with(s.style) {
					margin = '0';
					paddingTop = '6px';
					color = fc;
					lineHeight = 'normal';
				}
				s.appendChild(dt.createTextNode(el.getAttribute('title')));
				ct.style.paddingBottom = '8px';
				ct.appendChild(s);
				ct.style.top = (cty-Math.round(s.offsetHeight/2)+4)+'px';
			}

			var s = dt.createElement('img');
			with(s.style) {
				display = 'block';
				position = 'absolute';
				top = '1px';
				right = '1px';
				width = '16px';
				height = '16px';
				cursor = 'pointer';
			}
			s.setAttribute('src', id+'ml_close.gif');
			s.setAttribute('alt', 'ESC');
			s.onclick = mlbox.die;
			ct.appendChild(s);

			var po = null, no = null;
			if(el.className.indexOf('[')>1) {
				var g = el.className.replace(/^(.*)\[/, '').replace(/\](.*)?$/, '');
				var tmp = false, nxt = false, reg = new RegExp('(^|\\s)mlbox\\['+g+'\\]($|\\s)','');
				for(var i in dt.links)
					if(dt.links[i].className && dt.links[i].className.match(reg)) {
						if(po != null) nxt = true;
						if(dt.links[i] == el && po == null) po = tmp;
						tmp = dt.links[i];
						if(nxt && dt.links[i] != el) {
							no = dt.links[i];
							break;
						}
					}
				var w = Math.round(im.offsetWidth/2-10);
				if(im.nodeName.toLowerCase() == 'div') w = 45;
				if(po) {
					var s = dt.createElement('div');
					cte(s);
					with(s.style) {
						left = '20px';
						width = w+'px';
						backgroundImage = 'url('+id+'ml_prev.gif)';
					}
					s.onmouseover = function(){this.style.backgroundPosition='center left';}
					s.onclick = function(){bg.onclick=null;chg(po);}
					ct.appendChild(s);
				}
				if(no) {
					var s = dt.createElement('div');
					cte(s);
					with(s.style) {
						right = '20px';
						width = w+'px';
						backgroundImage = 'url('+id+'ml_next.gif)';
					}
					s.onmouseover = function(){this.style.backgroundPosition='center right';}
					s.onclick = function(){bg.onclick=null;chg(no);}
					ct.appendChild(s);
				}
				if(po || no) {
					im.onclick = null;
					im.style.cursor = 'default';
				}
			}

			var kc = 0;
			ok = dt.onkeydown;
			dt.onkeydown = function(event) {
				kc = ('which' in event) ? event.which : event.keyCode;
				if((kc == 27 || kc == 37 || kc == 39) && event.stopPropagation) {
					event.stopPropagation();
					event.preventDefault();
				}
				if(kc == 27) mlbox.die();
				if(kc == 37 && po) {
					bg.onclick = null;
					chg(po);
				}
				if(kc == 39 && no) {
					bg.onclick = null;
					chg(no);
				}
			}

			ct.style.visibility = '';
			pg.style.display = 'none';
		}
	}

	function chg(obj) {
		var bd = dt.body;
		if(ct) {
			bd.removeChild(ct);
			ct = null;
			im = null;
		}
		el = obj;
		pre();
	}

	var pre = function()
	{
		var ss = el.href.toLowerCase();
		var fnd = false;
		for(var i in fa) if(ss.indexOf(fa[i])>0) {
			fnd = true;
			break;
		}
		if(fnd) {
			axf();
		}
			else
		{
			im = dt.createElement('img');
			var ts = (isChrome?'?t='+new Date().getTime():'');
			im.setAttribute('src', el.href+ts);
			im.onclick = mlbox.die;
			im.style.cursor = 'pointer';
			if(im.complete) shw(); else im.onload = shw;
		}
	}

	var cte = function(s) {
		with(s.style) {
			position = 'absolute';
			top = '20px';
			height = im.offsetHeight+'px';
			backgroundRepeat = 'no-repeat';
			backgroundPosition = '-1000px -1000px';
			cursor = 'pointer';
		}
		s.onmousedown = function(){return!1;}
		s.onselectstart = function(){return!1;}
		s.onmouseout = function(){this.style.backgroundPosition='-1000px -1000px';}
	}

	var st = function() {
		var s=0;if(window.pageYOffset)s=window.pageYOffset;else{
		if(dt.documentElement&&dt.documentElement.scrollTop)s=dt.documentElement.scrollTop;else{
		if(dt.body)s=dt.body.scrollTop;}}return s;
	}

	var sl = function() {
		var s=0;if(window.pageXOffset)s=window.pageXOffset;else{
		if(dt.documentElement&&dt.documentElement.scrollLeft)s=dt.documentElement.scrollLeft;else{
		if(dt.body)s=dt.body.scrollLeft;}}return s;
	}

	var axf = function() {
		var xmlhttp = null;
		try {
			xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
		} catch(e) {
			try { xmlhttp = new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {
				if(typeof XMLHttpRequest != 'undefined') {
					xmlhttp = new XMLHttpRequest();
				}
			}
		}
		if(xmlhttp) {
			var sst = '200';
			if(el.href.indexOf('file:/')>-1) sst = '0';
			xmlhttp.open('GET', el.href, true);
			xmlhttp.onreadystatechange = function() {
				if(xmlhttp.readyState == 4) {
					im = dt.createElement('div');
					if(xmlhttp.status == sst) im.innerHTML = xmlhttp.responseText;
						else im.innerHTML = 'Error! Status='+xmlhttp.status;
					shw();
				}
			}
			xmlhttp.send(el.href);
		} else mlbox.die;
	}

	init();
}

if(window.addEventListener) {
	window.addEventListener('load', mlbox, false);
} else { if(window.attachEvent) {
	window.attachEvent('onload', mlbox);
}}