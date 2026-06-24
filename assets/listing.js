/* listing.js — interactivity ONLY for a property page.
   The page content is hardcoded HTML; this just wires up:
     • the photo lightbox (Photos / Video / Floor Plans tabs)
     • the mobile slide-out menu
     • the transparent-header-on-scroll behavior
     • the SOLD/PENDING banner parallax
     • the "Schedule a Showing" form -> Google Apps Script
   Each page sets window.__LB = {photos:[], floors:[], videos:[], formUrl:""}. */
(function () {
	var CFG = window.__LB || { photos: [], floors: [], videos: [], formUrl: "" };
	var PHOTOS = CFG.photos || [], FLOORS = CFG.floors || [], VIDEOS = CFG.videos || [];
	function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

	/* header on scroll */
	(function(){
		var header=document.getElementById('siteHeader'),hero=document.querySelector('.hero');if(!header||!hero)return;
		var heroImg=hero.querySelector('img')||hero,last=0;
		function onScroll(){var y=window.pageYOffset||document.documentElement.scrollTop;var t=Math.max(0,heroImg.offsetHeight-header.offsetHeight);
			if(y>t)header.classList.add('scrolled');else header.classList.remove('scrolled');
			if(y<=t)header.classList.remove('hide');else if(y>last+4)header.classList.add('hide');else if(y<last-4)header.classList.remove('hide');last=y;}
		window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);onScroll();
	})();

	/* mobile side menu */
	(function(){
		var menu=document.getElementById('sidemenu'),scrim=document.getElementById('scrim'),burger=document.getElementById('burger'),close=document.getElementById('smClose');
		if(!menu||!burger)return;
		function open(){menu.classList.add('open');scrim.classList.add('open');menu.setAttribute('aria-hidden','false');burger.setAttribute('aria-expanded','true');}
		function shut(){menu.classList.remove('open');scrim.classList.remove('open');menu.setAttribute('aria-hidden','true');burger.setAttribute('aria-expanded','false');}
		burger.addEventListener('click',open);close.addEventListener('click',shut);scrim.addEventListener('click',shut);
		document.addEventListener('keydown',function(e){if(e.key==='Escape')shut();});
		menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',shut);});
	})();

	/* (The SOLD/PENDING banner now scrolls via a pure-CSS marquee — no JS.) */

	/* gallery + lightbox */
	(function(){
		var grid=document.getElementById('grid'),lb=document.getElementById('lb');if(!lb)return;
		var li=document.getElementById('lbimg'),vid=document.getElementById('lbVideo'),tabs=document.getElementById('lbTabs'),
			bar=document.getElementById('lbBar'),count=document.getElementById('lbCount'),prev=lb.querySelector('.p'),next=lb.querySelector('.x');
		var mode='photos',cur=0;
		function listFor(m){return m==='floorplan'?FLOORS:(m==='video'?VIDEOS:PHOTOS);}
		function positionBar(){/* tabs + counter sit in normal flow now; no JS positioning needed */}
		function vbare(v){if(!v)return '';if(v.type==='youtube')return '<iframe src="https://www.youtube.com/embed/'+esc(v.src)+'?autoplay=1" title="'+esc(v.title||'Video tour')+'" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
			return '<video controls autoplay playsinline><source src="'+v.src+'" type="video/mp4"></video>';}
		function render(){
			if(tabs)tabs.querySelectorAll('button').forEach(function(b){b.classList.toggle('active',b.dataset.mode===mode);});
			var list=listFor(mode);
			if(mode==='video'){li.style.display='none';vid.style.display='block';vid.innerHTML=vbare(VIDEOS[cur]);
				var mv=list.length>1;prev.style.display=mv?'':'none';next.style.display=mv?'':'none';count.style.display=mv?'':'none';count.textContent=(cur+1)+' / '+list.length;positionBar();}
			else{vid.style.display='none';vid.innerHTML='';li.style.display='';count.style.display='';count.textContent=(cur+1)+' / '+list.length;
				var m=list.length>1;prev.style.display=m?'':'none';next.style.display=m?'':'none';li.onload=positionBar;li.src=list[cur];if(li.complete)positionBar();}
		}
		function setMode(m){mode=m;cur=0;render();}
		function openAt(m,i){mode=m;cur=i||0;lb.classList.add('open');render();}
		function closeLb(){lb.classList.remove('open');li.src='';vid.innerHTML='';}
		function step(d){var list=listFor(mode);if(!list.length)return;cur=(cur+d+list.length)%list.length;render();}
		if(grid){Array.prototype.forEach.call(grid.querySelectorAll('a'),function(a,i){a.addEventListener('click',function(e){e.preventDefault();openAt('photos',i);});});
			var more=document.getElementById('more');if(more)more.addEventListener('click',function(){grid.classList.add('all');this.style.display='none';});}
		var fp=document.getElementById('fpStrip');
		if(fp)Array.prototype.forEach.call(fp.querySelectorAll('a'),function(a,i){a.addEventListener('click',function(e){e.preventDefault();openAt('floorplan',i);});});
		if(tabs)tabs.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){setMode(b.dataset.mode);});});
		lb.querySelector('.c').onclick=closeLb;prev.onclick=function(){step(-1);};next.onclick=function(){step(1);};
		lb.addEventListener('click',function(e){if(e.target===lb)closeLb();});
		document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1);});
		window.addEventListener('resize',function(){if(lb.classList.contains('open'))positionBar();});
		var hp=document.getElementById('heroPhotos');if(hp)hp.addEventListener('click',function(e){e.preventDefault();openAt('photos',0);});
	})();

	/* showing form */
	(function(){
		var form=document.getElementById('form');if(!form)return;var prop=document.title;
		document.getElementById('property').value=prop;
		form.addEventListener('submit',function(e){e.preventDefault();var b=document.getElementById('sb'),msg=document.getElementById('msg');
			b.disabled=true;b.textContent='Sending…';
			var pl={property:prop,firstName:fn.value,lastName:ln.value,phone:ph.value,email:em.value,comments:cmt.value,consent:document.getElementById('consent').checked?'Yes':'No'};
			var body=Object.keys(pl).map(function(k){return encodeURIComponent(k)+'='+encodeURIComponent(pl[k]);}).join('&');
			fetch(CFG.formUrl,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body})
			.then(function(){msg.style.color='#2a7a2a';msg.textContent="Thank you! We'll be in touch.";msg.style.display='block';form.reset();b.disabled=false;b.textContent='Request Showing';})
			.catch(function(){msg.style.color='#c00';msg.textContent='Network error. Please try again.';msg.style.display='block';b.disabled=false;b.textContent='Request Showing';});
		});
	})();
})();
