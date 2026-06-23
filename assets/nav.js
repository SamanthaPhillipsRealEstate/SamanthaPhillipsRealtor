/* Mobile side menu.
   Adds a hamburger button to the header and a slide-in drawer that holds
   copies of the existing header nav links (Featured Properties / About Me).
   Because the links are CLONED from .header-nav, each page automatically
   keeps its own correct hrefs (homepage vs. property-page relative paths).
   Pairs with assets/nav.css, which shows the drawer only at <=768px. */
(function () {
	var header = document.getElementById('site-header');
	if (!header) return;
	var inner = header.querySelector('.header-inner');
	var nav   = header.querySelector('.header-nav');
	if (!inner || !nav) return;

	// Hamburger button
	var btn = document.createElement('button');
	btn.className = 'nav-toggle';
	btn.type = 'button';
	btn.setAttribute('aria-label', 'Open menu');
	btn.setAttribute('aria-expanded', 'false');
	btn.innerHTML = '<span></span><span></span><span></span>';
	inner.appendChild(btn);

	// Backdrop
	var backdrop = document.createElement('div');
	backdrop.className = 'nav-backdrop';

	// Drawer
	var drawer = document.createElement('nav');
	drawer.className = 'nav-drawer';
	drawer.setAttribute('aria-label', 'Menu');

	var closeBtn = document.createElement('button');
	closeBtn.className = 'nav-drawer-close';
	closeBtn.type = 'button';
	closeBtn.setAttribute('aria-label', 'Close menu');
	closeBtn.innerHTML = '&times;';
	drawer.appendChild(closeBtn);

	// Clone the existing links so hrefs/labels match this page exactly
	nav.querySelectorAll('a').forEach(function (a) {
		drawer.appendChild(a.cloneNode(true));
	});

	document.body.appendChild(backdrop);
	document.body.appendChild(drawer);

	function open() {
		drawer.classList.add('is-open');
		backdrop.classList.add('is-open');
		btn.setAttribute('aria-expanded', 'true');
		document.body.style.overflow = 'hidden';
	}
	function close() {
		drawer.classList.remove('is-open');
		backdrop.classList.remove('is-open');
		btn.setAttribute('aria-expanded', 'false');
		document.body.style.overflow = '';
	}

	btn.addEventListener('click', open);
	closeBtn.addEventListener('click', close);
	backdrop.addEventListener('click', close);
	drawer.addEventListener('click', function (e) {
		if (e.target.tagName === 'A') close();   // close after tapping a link
	});
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') close();
	});
})();
