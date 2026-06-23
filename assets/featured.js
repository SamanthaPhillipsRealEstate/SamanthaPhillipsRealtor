/* Featured Properties grid builder.
   Reads window.LISTINGS (from listings.js, which must load FIRST), sorts by
   status (Live -> Pending -> Sold) then by date (newest first within a group),
   and renders the cards into <div class="fp-grid">. */
(function () {
	var listings = window.LISTINGS;
	var grid = document.querySelector('.fp-grid');
	if (!listings || !grid) return;

	var RANK = { live: 0, pending: 1, sold: 2 };

	var sorted = listings.slice().sort(function (a, b) {
		var ra = RANK[a.status]; if (ra === undefined) ra = 9;
		var rb = RANK[b.status]; if (rb === undefined) rb = 9;
		if (ra !== rb) return ra - rb;                       // status group
		return (b.date || '').localeCompare(a.date || '');   // newest first
	});

	function esc(s) {
		return String(s == null ? '' : s)
			.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	function statusLine(p) {
		var label = p.statusLabel || (p.status === 'pending' ? 'PENDING'
			: p.status === 'sold' ? 'SOLD' : '');
		if (!label) return '';
		var cls = p.status === 'pending' ? 'fp-sub--pending'
			: p.status === 'sold' ? 'fp-sub--sold' : '';
		return '<div class="fp-sub ' + cls + '">*' + esc(label) + '*</div>';
	}

	function card(p) {
		return '' +
			'<a href="' + esc(p.href) + '" aria-label="View listing: ' + esc(p.title) + '" class="fp-card-link">' +
				'<div class="fp-hero">' +
					'<img src="' + esc(p.thumb) + '" alt="' + esc(p.title) + '">' +
					'<div class="fp-overlay"></div>' +
					'<div class="fp-content">' +
						'<div class="fp-title">' + esc(p.title) + '</div>' +
						'<div class="fp-sub">' + esc(p.city) + '</div>' +
						statusLine(p) +
					'</div>' +
				'</div>' +
			'</a>';
	}

	grid.innerHTML = sorted.map(card).join('');
})();
