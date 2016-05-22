(function (sb, $) {
	var home = sb.home = {};

	home.init = function () {
		if (sb.rwd.matchViewport('L')) {
			if (!home.activatePromoHover) {
				home.promoHoverOn();
			}
		} else {
			if (home.activatePromoHover) {
				home.promoHoverOff();
			}
		}
	};

	home.activatePromoHover = false;

	home.promoHoverOff = function () {
		sb.console.info('sb.home.promoHoverOff()');
		home.activatePromoHover = false;

		$('.promos').find('a').unbind('hover');
	};

	home.promoHoverOn = function () {
		sb.console.info('sb.home.promoHoverOn()');
		home.activatePromoHover = true;

		$('.promos').find('a').hover(function () {
			$(this).find('p').stop().addClass('open').animate({'top': '0'}, 400);
		}, function () {
			$(this).find('p').stop().animate({'top': '400px'}, 400).removeClass('open');
		});
	};

	$(function () {
		sb.rwd.onDelayedResize(home.init, true);
	});
}(window.sb = window.sb || {}, jQuery));