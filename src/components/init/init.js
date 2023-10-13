$(function () {
	function aos() {
		AOS.init({
			startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
			initClassName: "aos-init", // class applied after initialization
			animatedClassName: "is-inview", // class applied on animation
			useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
			disableMutationObserver: false, // disables automatic mutations' detections (advanced)
			debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
			throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

			// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
			offset: 120, // offset (in px) from the original trigger point
			delay: 0, // values from 0 to 3000, with step 50ms
			duration: 1000, // values from 0 to 3000, with step 50ms
			easing: "ease", // default easing for AOS animations
			once: false, // whether animation should happen only once - while scrolling down
			mirror: false, // whether elements should animate out while scrolling past them
			anchorPlacement: "top-bottom",
		});
	}
	components();
	// let scroll = new LocomotiveScroll({
	// 	el: document.querySelector("[data-aos-container]"),
	// 	smooth: true,
	// });
	// scroll.on("scroll", (args) => {
	// 	// Get all current elements : args.currentElements

	// 	if (typeof args.currentElements === "object") {
	// 		// let progress = args.currentElements["hhh"].progress;
	// 		let progress = 0;

	// 		for (key in args.currentElements) {
	// 			console.log(
	// 				$(args.currentElements[key].el).hasClass("two-photo")
	// 			);
	// 			if ($(args.currentElements[key].el).hasClass("two-photo")) {
	// 				let $th = $(args.currentElements[key].el);
	// 				$th.find(".two-photo__big:first-child").css(
	// 					"padding-right",
	// 					args.currentElements[key].progress * 174
	// 				);
	// 				$th.find(".two-photo__small:last-child").css(
	// 					"padding-left",
	// 					(1 - args.currentElements[key].progress) * 174
	// 				);
	// 				$th.find(".two-photo__big:last-child").css(
	// 					"padding-left",
	// 					args.currentElements[key].progress * 174
	// 				);
	// 				$th.find(".two-photo__small:first-child").css(
	// 					"padding-right",
	// 					(1 - args.currentElements[key].progress) * 174
	// 				);
	// 			}
	// 		}

	// 		// ouput log example: 0.34
	// 		// gsap example : myGsapAnimation.progress(progress);
	// 	}
	// });
	aos();
	front();

	barba.hooks.after(() => {
		aos();
	});
	barba.hooks.before(() => {
		setTimeout(function () {
			components();
			front();
		}, 100);
	});

	barba.init({
		transitions: [
			{
				sync: true,
				name: "card",
				from: {
					namespace: ["front"],
				},
				to: {
					namespace: ["chapter"],
				},
				beforeLeave() {
					gsap.to(".front-card", {
						top: 0,
						zIndex: 0,
						width: $(".front__swiper").width(),
						marginLeft: 0,
						duration: 0.2,
					});
				},
				afterLeave() {
					$("html").removeClass("_cards-aniimte  ");
					$(".cards-current").removeClass("cards-current");
					$(".cards-next").removeClass("cards-next");
					// $("html,body").scrollTo(0);
				},
				leave(data) {
					$("html,body").scrollTop(0);
					$("html").addClass("_cards-aniimte");
					$(data.current.container).addClass("cards-current");
					return gsap.to(data.current.container, {
						opacity: 0,
						duration: 0.5,
					});
				},
				enter(data) {
					$(data.next.container).addClass("cards-next");
					setTimeout(function () {
						$(data.next.container).addClass("cards-next-anim");
					}, 50);
					return gsap.to(data.next.container, {
						duration: 200,
						y: 0,
						top: window.innerWidth <= 1024 ? 102 : 172,
					});
				},
			},
			{
				sync: true,
				name: "chapter",
				from: {
					namespace: ["chapter"],
				},
				to: {
					namespace: ["chapter"],
				},

				// beforeEnter(data) {
				// 	$(data.current.container).addClass("chapter-current");
				// },
				// beforeLeave(data) {
				// 	$("html,body").scrollTo(0);
				// 	$("html").addClass("_chapter-aniimte  ");
				// 	$(data.next.container).addClass("chapter-next");
				// },
				afterLeave() {
					$("html").removeClass("_chapter-aniimte  ");
					$(".chapter-current").removeClass("chapter-current");
					$(".chapter-next").removeClass("chapter-next");
					// $("html,body").scrollTo(0);
				},
				leave(data) {
					$("html,body").scrollTop(0);
					$("html").addClass("_chapter-aniimte");
					$(data.current.container).addClass("chapter-current");
					return gsap.to(data.current.container, {
						y:
							-1 * window.innerHeight +
							400 +
							(window.innerWidth <= 1024 ? 102 : 172) +
							(window.innerWidth <= 1024 ? 40 : 61),
						duration: 1,
					});
				},
				enter(data) {
					$(data.next.container).addClass("chapter-next");
					return gsap.to(data.next.container, {
						duration: 1,
						y: 0,
					});
				},
			},
		],
	});
});
