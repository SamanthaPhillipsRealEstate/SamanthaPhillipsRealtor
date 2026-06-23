/* Per-page status banner injector.
   On a property page, this finds that property's entry in window.LISTINGS
   (from listings.js, which must load FIRST) by matching the folder slug in the
   URL. If the property is Pending or Sold, it injects a scrolling banner right
   under the hero. Live (or external) listings get nothing. */
(function () {
	var listings = window.LISTINGS;
	var hero = document.querySelector('.hero-section');
	if (!listings || !hero) return;

	// Derive the slug from /properties/<slug>/ in the path.
	var m = window.location.pathname.match(/\/properties\/([^\/]+)\/?/);
	if (!m) return;
	var slug = m[1];

	var p = null;
	for (var i = 0; i < listings.length; i++) {
		if (listings[i].slug === slug) { p = listings[i]; break; }
	}
	if (!p || p.external || p.status === 'live') return;

	var label = p.statusLabel || (p.status === 'sold' ? 'SOLD' : 'PENDING');
	var cls = p.status === 'sold' ? 'is-sold' : 'is-pending';

	var section = document.createElement('section');
	section.className = 'status-banner ' + cls;

	var text = document.createElement('div');
	text.className = 'scroll-text';

	var unit = label + '   ';
	var line = '';
	for (var j = 0; j < 15; j++) line += unit;
	text.textContent = line;

	section.appendChild(text);
	hero.parentNode.insertBefore(section, hero.nextSibling);

	// Drift the text horizontally as the page scrolls (matches the original
	// effect from the Flamingo Drive page).
	var baseOffset = -2000;
	var scrollFactor = 2;
	function update() {
		text.style.transform = 'translateX(' + (baseOffset + window.scrollY * scrollFactor) + 'px)';
	}
	update();
	window.addEventListener('scroll', update);
})();
