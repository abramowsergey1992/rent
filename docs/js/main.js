function front() {
	if ($(".front-top__slider").length) {
		$(".front-top__slider").each(function () {
			let $th = $(this);
			let swiper = new Swiper($th[0], {
				effect: "fade",
				loop: true,
				slidesPerView: 1,
				allowTouchMove: false,
				preventClicks: false,
				spaceBetween: 20,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				pagination: {
					el: $(".front-top__pagi")[0],
					type: "bullets",

					renderBullet: function (index, className) {
						return (
							'<span class="' +
							className +
							'"> <svg width="26" height="26" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg"><circle opacity="0.3" r="11" cx="12" cy="12"  stroke="white" stroke-width="2"/><circle class="front-slider__autoplay-circle" r="11" cx="12" cy="12"  stroke="white" stroke-width="2"/></svg></span>'
						);
					},
				},
				on: {
					autoplayTimeLeft: function (swiper, timeLeft, percentage) {
						let progress = $(".front-slider__autoplay-circle");
						progress.css(
							"stroke-dasharray",
							(1 - percentage) * 70 + "px, 70px"
						);
					},
				},
			});
		});
	}
	if ($(".front-quiz__slider").length) {
		$(".front-locations__slider").each(function () {
			let $th = $(this);
			let swiper = new Swiper($th[0], {
				loop: true,
				slidesPerView: 1,
				preventClicks: false,
				spaceBetween: 17,
				loopedSlides: 5,
				autoplay: {
					delay: 3000,
				},
				mousewheel: {
					forceToAxis: true,
				},
			});
		});
		$(".front-quiz__slider-test").each(function () {
			let $th = $(this);
			let swiper = new Swiper($th[0], {
				autoHeight: true,
				slidesPerView: 1,
				allowTouchMove: true,
				preventClicks: false,
				spaceBetween: 20,
				on: {
					slideChange: function (swiper) {
						console.log(swiper.activeIndex);
						if (swiper.activeIndex == 0) {
							$th.closest(".front-quiz")
								.find(".front-quiz__test-back")
								.addClass("_disable");
						} else {
							$th.closest(".front-quiz")
								.find(".front-quiz__test-back")
								.removeClass("_disable");
						}
						// if (swiper.activeIndex == swiper.slides.length - 1) {
						// 	$th.closest(".front-quiz")
						// 		.find(".front-quiz__test-next")
						// 		.addClass("_disable");
						// } else {
						// 	$th.closest(".front-quiz")
						// 		.find(".front-quiz__test-next")
						// 		.removeClass("_disable");
						// }
					},
				},
				pagination: {
					el: $th
						.closest(".front-quiz")
						.find(".front-quiz__test-pagi ")[0],
					type: "fraction",

					renderFraction: function (currentClass, totalClass) {
						return (
							'<span class="' +
							currentClass +
							'"></span>' +
							" из " +
							'<div class="' +
							totalClass +
							'"></div>'
						);
					},
				},
			});
			$(".front-quiz__test-back").click(function () {
				swiper.slidePrev();
			});
			$(".front-quiz__slider-test  input").change(function () {
				$(".front-quiz__slider-test  input").removeClass("error");
			});
			$(".front-quiz__test-next").click(function () {
				if (
					$(
						".front-quiz__slider-test .swiper-slide-active input:checked"
					).length
				) {
					if (swiper.activeIndex == swiper.slides.length - 1) {
						$("#front-quiz__form").submit();
						console.log("sss");
					} else {
						swiper.slideNext();
					}
				} else {
					$(
						".front-quiz__slider-test .swiper-slide-active input"
					).addClass("error");
				}
			});
		});
	}
	if ($("#front-loc-map").length) {
		let $map = $("#front-loc-map");

		ymaps.ready(init);
		function init() {
			console.log($map.data("center"));
			var myMap = new ymaps.Map(
				"front-loc-map",
				{
					center: [
						$map.data("center").split(",")[0],
						$map.data("center").split(",")[1],
					],
					zoom: 11,
					controls: [],
				},
				{
					searchControlProvider: "yandex#search",
				}
			);

			$(".map-location").each(function () {
				console.log($(this));
				myPlacemark = new ymaps.Placemark(
					[
						$(this).data("coord").split(",")[0],
						$(this).data("coord").split(",")[1],
					],
					{
						balloonContent: $(this)
							.find(".map-location__title")
							.text(),
					},
					{
						id: $(this).attr("id"),
						balloonCloseButton: false,
						hideIconOnBalloonOpen: false,
						iconLayout: "default#image",
						iconImageHref: $map.data("icon"),
						iconImageSize: [33, 45],
						iconImageOffset: [-16, -0],
					}
				);

				myPlacemark.events.add(["balloonopen"], function (e) {
					e.get("target").options.set(
						"iconImageHref",
						$map.data("activeicon")
					);
					console.log(e.get("target").geometry.getCoordinates());
					console.log(e.get("target").options.get("id"));
					console.log(
						$("#" + e.get("target").options.get("id"))
							.data("coord")
							.split(",")[0],
						$("#" + e.get("target").options.get("id"))
							.data("coord")
							.split(",")[1]
					);
					// myMap.panTo(
					// 	$("#" + e.get("target").options.get("id"))
					// 		.data("coord")
					// 		.split(",")[0],
					// 	$("#" + e.get("target").options.get("id"))
					// 		.data("coord")
					// 		.split(",")[1],
					// );
					$(".location-map-prev").stop().slideUp();
					var smallScreen = window.matchMedia("(max-width: 992px)");

					$("#" + e.get("target").options.get("id"))
						.stop()
						.fadeIn();
				});
				myPlacemark.events.add(["balloonclose"], function (e) {
					e.get("target").options.set(
						"iconImageHref",
						$map.data("icon")
					);
				});
				myMap.geoObjects.add(myPlacemark);
			});
		}
	}
	if ($(".front-locations__slider").length) {
		$(".front-locations__slider").each(function () {
			let $th = $(this);
			let swiper = new Swiper($th[0], {
				centeredSlides: true,
				loop: true,
				autoHeight: true,
				allowTouchMove: false,

				preventClicks: false,
				spaceBetween: 17,
			});
			$(".front-locations__map").click(function () {
				$(".front-locations__map").addClass("_d-none");
				$(".front-locations__row").removeClass("_d-none");
				swiper.slideTo(0);
			});
			$(".front-locations__row").click(function () {
				$(".front-locations_row").addClass("_d-none");
				$(".front-locations__map").removeClass("_d-none");
				swiper.slideTo(1);
			});
		});
	}
	if ($(".front-locations__slider2").length) {
		$(".front-locations__slider2").each(function () {
			let $th = $(this);
			let swiper = new Swiper($th[0], {
				loop: true,
				slidesPerView: 1.1,
				preventClicks: false,
				spaceBetween: 17,
				loopedSlides: 5,
				// autoplay: {
				// 	delay: 3000,
				// },
				mousewheel: {
					forceToAxis: true,
				},
			});
		});
	}
	if ($(".front-locations__slider2").length) {
		$(".front-locations__slider2").each(function () {
			let $th = $(this);
			let swiper = new Swiper($th[0], {
				loop: true,
				slidesPerView: 1.1,
				preventClicks: false,
				spaceBetween: 17,
				loopedSlides: 5,
				// autoplay: {
				// 	delay: 3000,
				// },
				mousewheel: {
					forceToAxis: true,
				},
			});
		});
	}

	if ($(".front-news__slider").length) {
		$(".front-news__slider").each(function () {
			let $th = $(this);
			let swiper = new Swiper($th[0], {
				centeredSlides: true,
				loop: true,
				slidesPerView: 1,

				preventClicks: false,
				spaceBetween: 20,
				autoplay: {
					delay: 3000,
				},
			});
		});
	}
	if ($(".front-events__slider").length) {
		$(".front-events__slider").each(function () {
			let $th = $(this);
			let swiper = new Swiper($th[0], {
				centeredSlides: true,
				loop: true,
				slidesPerView: 1,
				preventClicks: false,
				spaceBetween: 17,
				loopedSlides: 5,
				// autoplay: {
				// 	delay: 3000,
				// },
				mousewheel: {
					forceToAxis: true,
				},
			});
		});
	}
	if ($(".front-promo__slider ").length) {
		$(".front-promo__slider ").each(function () {
			let $th = $(this);
			let swiper = new Swiper($th[0], {
				freemode: true,
				loop: true,
				slidesPerView: "auto",
				preventClicks: false,
				spaceBetween: 17,
				loopedSlides: 5,
				// autoplay: {
				// 	delay: 3000,
				// },
				mousewheel: {
					forceToAxis: true,
				},
			});
		});
	}
	if ($(".front-service__slider  ").length) {
		$(".front-service__slider  ").each(function () {
			let $th = $(this);
			let swiper = new Swiper($th[0], {
				freemode: true,
				loop: true,
				slidesPerView: "auto",
				preventClicks: false,
				spaceBetween: 17,
				loopedSlides: 5,

				mousewheel: {
					forceToAxis: true,
				},
			});
		});
	}
}

$(function(){})
$(function(){})
// function footer() {
// 	$(".footer").append($('.footer__line'){})
// }
// $(function () {
// 	footer();
// });

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

function header() {
	$(".header__open-menu").click(function () {
		$(".header").toggleClass("_open-menu");
	});
	$(".header-menu__item a").click(function () {
		$(".header").removeClass("_open-menu");
	});
	$(".header__contact").click(function () {
		$(".header").removeClass("_open-menu");
	});
}
$(function () {
	header();
});

function popup() {
	$(".popup-gallery__close").click(function () {
		$(".popup-gallery").fadeOut();
	});
	$(".popup-gallery__slider").each(function () {
		let $th = $(this);
		let speed = 2000;
		let swiper = new Swiper($th.find(".popup-gallery__swiper")[0], {
			observerParent: true,
			observerUpdate: true,
			observer: true,
			loop: true,
			slidesPerView: 1,
			loopedSlides: 7,
			speed: speed,
			spaceBetween: 20,
			breakpoints: {
				600: {
					spaceBetween: 50,
				},
				1300: {
					spaceBetween: 97,
				},
			},
		});
		let hover = false;
		let play = false;
		let direction = "";
		let t = 0;
		let interval = setInterval(function () {
			if (play) {
				if (t == 0) {
					if (direction == "LEFT") {
						swiper.slidePrev();
						console.log("left !!!!");
					}
					if (direction == "RIGHT") {
						swiper.slideNext();
					}
				}
				t += 100;
				if (t == speed) {
					t = 0;
				}
			}
		}, 100);
		$(this).hover(
			function () {
				play = true;
			},
			function () {
				play = false;
			}
		);

		let $cursor = $(this).find(".popup-gallery__cursor");

		$(this).mousemove(function (e) {
			gsap.to($cursor, 0.23, {
				left: e.pageX,
				top: e.pageY - $th.offset().top,
				ease: Power4.easOut,
			});

			direction = "";
			if (play && e.clientX < window.innerWidth / 3) {
				play = true;
				direction = "LEFT";

				console.log("autoplay left");
			}

			if (play && e.clientX > window.innerWidth - window.innerWidth / 3) {
				play = true;
				direction = "RIGHT";
				console.log("autoplay right");
			}
		});
	});
}
$(function () {
	popup();
});

function components() {
	$(".filters").each(function () {
		$(this)
			.find(".filters__flex")
			.append('<div class="filters__bg"></div>');
	});
	$("._hover-in-video").hover(
		function () {
			if ($(this).find("video")[0]) {
				$(this).find("video")[0].play();
			}
		},
		function () {
			if ($(this).find("video")[0]) {
				$(this).find("video")[0].pause();
			}
		}
	);

	function filtersBg() {
		$(".filters").each(function () {
			filterBg = $(this).find(".filters__bg");

			filterActive = $(this)
				.find(".mixitup-control-active,._active")
				.first();

			console.log(filterActive, filterActive.outerHeight());
			filterBg.css({
				width: filterActive.outerWidth(),
				height: filterActive.outerHeight(),
				top: filterActive.position().top,
				left: filterActive.position().left,
			});
		});
	}
	$(".filters__btn").click(function () {
		$(".filters__btn")
			.closest(".filters")
			.find(".filters__btn")
			.removeClass("_active");
		$(this).addClass("_active");
		setTimeout(function () {
			filtersBg();
		}, 50);
	});
	filtersBg();
	setTimeout(function () {
		filtersBg();
	}, 250);
	window.addEventListener(
		"resize",
		function (event) {
			filtersBg();
		},
		true
	);
	// $(".block__head").append('<span class="block__head-line"></span>');
	// $(".block h2,.block .h2:not(a)").each(function () {
	// 	let $th = $(this);
	// 	$(this).after('<div class="block__h2-lines h2">');
	// 	$(this).wrap('<div class="block__h2-default">');
	// 	var result = $(this)
	// 		.html()
	// 		.replace(/[\wа-яё,.!:;(&)]+/gim, function (s) {
	// 			return s === "br" || s === "i" ? s : "<span>" + s + "</span>";
	// 		});

	// 	$(this).html(result);

	// 	$(this)
	// 		.find("i span")
	// 		.each(function () {
	// 			$(this).html("<i>" + $(this).text() + "</i>");
	// 		});

	// 	let range = 30;
	// 	let line = 1;
	// 	let lt = 0;

	// 	$(this)
	// 		.find("span,br")
	// 		.each(function () {
	// 			if ($(this).position().top >= lt + range) {
	// 				line++;
	// 				lt = $(this).position().top;
	// 			}
	// 			$(this).attr("line", line);
	// 		});
	// 	let lines = $(this)
	// 		.closest(".block__h2-default")
	// 		.next(".block__h2-lines");
	// 	for (let i = 1; i < 30; i++) {
	// 		let $line = $("<div>", {
	// 			class: `block__h2-line-${i}`,
	// 		});
	// 		let flag = 0;
	// 		$th.find("span[line='" + i + "']").each(function () {
	// 			$line.append($(this).clone());
	// 			$line.append(" ");
	// 			flag = 1;
	// 		});
	// 		if (flag) {
	// 			lines.append($line);
	// 			$line.wrap('<div class="block__h2-line-wrap">');
	// 		}
	// 	}
	// });
	// window.addEventListener(
	// 	"resize",
	// 	function (event) {
	// 		$(".block h2,.block .h2:not(a)").each(function () {
	// 			let $th = $(this);
	// 			let range = 30;
	// 			let line = 1;
	// 			let lt = 0;

	// 			$(this)
	// 				.find("span,br")
	// 				.each(function () {
	// 					if ($(this).position().top >= lt + range) {
	// 						line++;
	// 						lt = $(this).position().top;
	// 					}
	// 					$(this).attr("line", line);
	// 				});
	// 			let lines = $(this)
	// 				.closest(".block__h2-default")
	// 				.next(".block__h2-lines");
	// 			lines.html("");
	// 			for (let i = 1; i < 30; i++) {
	// 				let $line = $("<div>", {
	// 					class: `block__h2-line-${i}`,
	// 				});
	// 				let flag = 0;
	// 				console.log($th.html());
	// 				$th.find("span[line='" + i + "']").each(function () {
	// 					$line.append($(this).clone());
	// 					$line.append(" ");
	// 					flag = 1;
	// 				});
	// 				if (flag) {
	// 					lines.append($line);
	// 					$line.wrap('<div class="block__h2-line-wrap">');
	// 				}
	// 			}
	// 		});
	// 	},
	// 	true
	// );

	// if ($(".photo-slider").length) {
	// 	$(".photo-slider").each(function () {
	// 		let $th = $(this);
	// 		let speed = 2000;
	// 		let swiper = new Swiper($th.find(".photo-slider__swiper")[0], {
	// 			centeredSlides: true,
	// 			loop: true,
	// 			loopedSlides: 7,
	// 			observerParent: true,
	// 			observerUpdate: true,
	// 			observer: true,
	// 			slidesPerView: "auto",
	// 			speed: speed,
	// 			preventClicks: false,
	// 			spaceBetween: 20,
	// 			breakpoints: {
	// 				600: {
	// 					spaceBetween: 100,
	// 				},
	// 				1300: {
	// 					spaceBetween: 215,
	// 				},
	// 			},
	// 			// autoplay: {
	// 			// 	delay: 0,
	// 			// },
	// 		});
	// 		let hover = false;
	// 		let play = false;
	// 		let direction = "";
	// 		let t = 0;
	// 		let interval = setInterval(function () {
	// 			console.log();
	// 			if (play) {
	// 				if (t == 0) {
	// 					if (direction == "LEFT") {
	// 						swiper.slidePrev();
	// 					}
	// 					if (direction == "RIGHT") {
	// 						swiper.slideNext();
	// 					}
	// 				}
	// 				t += 100;
	// 				if (t == speed) {
	// 					t = 0;
	// 				}
	// 			}
	// 		}, 100);
	// 		$(this).hover(
	// 			function () {
	// 				play = true;
	// 			},
	// 			function () {
	// 				play = false;
	// 			}
	// 		);

	// 		let $cursor = $(this).find(".photo-slider__cursor");

	// 		$(this).mousemove(function (e) {
	// 			gsap.to($cursor, 0.23, {
	// 				left: e.pageX,
	// 				top: e.pageY - $th.offset().top,
	// 				ease: Power4.easOut,
	// 			});

	// 			direction = "";
	// 			if (play && e.clientX < window.innerWidth / 3) {
	// 				play = true;
	// 				direction = "LEFT";
	// 				t = 0;
	// 				console.log("autoplay left");
	// 			}

	// 			if (
	// 				play &&
	// 				e.clientX > window.innerWidth - window.innerWidth / 3
	// 			) {
	// 				t = 0;
	// 				play = true;
	// 				direction = "RIGHT";
	// 				console.log("autoplay right");
	// 			}
	// 		});
	// 	});
	// }

	// $(".block__tabs .block__tab").click(function () {
	// 	$(this)
	// 		.closest(".block__tabs")
	// 		.find(".block__tab")
	// 		.removeClass("_active");
	// 	$(this).addClass("_active");
	// 	tabFilter();
	// });
	// function tabFilter() {
	// 	$(".block__tab").each(function () {
	// 		if ($(this).hasClass("_active")) {
	// 			$($(this).data("tab")).removeClass("_d-none");
	// 			// $(this).addClass("swiper-slide");
	// 		} else {
	// 			$($(this).data("tab")).addClass("_d-none");
	// 			// $(this).removeClass("swiper-slide");
	// 		}
	// 	});
	// }
	// tabFilter();
	// $(".air").each(function () {
	// 	new AirDatepicker(this, {});
	// });
	// $(".select2-wrap").each(function () {
	// 	$(this)
	// 		.find(".select2")
	// 		.select2({
	// 			minimumResultsForSearch: -1,
	// 			dropdownParent: $(this),
	// 			placeholder: $(this).find(".select2").attr("placeholder"),
	// 		});
	// });
	$("._arrow-btn").each(function () {
		$(this).html(
			'<span class="_arrow-btn-wrap"><svg class="_arrow-btn-prev" width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.89039 8.54926L7.36006 9.07959L8.42072 10.1403L8.95105 9.60992L7.89039 8.54926ZM12.0001 5.50025L12.5304 6.03058L13.0607 5.50025L12.5304 4.96991L12.0001 5.50025ZM8.95105 1.39057L8.42072 0.860238L7.36006 1.9209L7.89039 2.45123L8.95105 1.39057ZM8.95105 9.60992L12.5304 6.03058L11.4697 4.96991L7.89039 8.54926L8.95105 9.60992ZM12.5304 4.96991L8.95105 1.39057L7.89039 2.45123L11.4697 6.03058L12.5304 4.96991ZM12.0001 4.75025H0.367188V6.25025H12.0001V4.75025Z" fill="currentColor"/></svg> <span  class="_arrow-btn-content" >' +
				$(this).html() +
				'</span> <svg class="_arrow-btn-next" width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.89039 8.54926L7.36006 9.07959L8.42072 10.1403L8.95105 9.60992L7.89039 8.54926ZM12.0001 5.50025L12.5304 6.03058L13.0607 5.50025L12.5304 4.96991L12.0001 5.50025ZM8.95105 1.39057L8.42072 0.860238L7.36006 1.9209L7.89039 2.45123L8.95105 1.39057ZM8.95105 9.60992L12.5304 6.03058L11.4697 4.96991L7.89039 8.54926L8.95105 9.60992ZM12.5304 4.96991L8.95105 1.39057L7.89039 2.45123L11.4697 6.03058L12.5304 4.96991ZM12.0001 4.75025H0.367188V6.25025H12.0001V4.75025Z" fill="currentColor"/></svg></span>'
		);
	});
	$("._mask-phone").each(function () {
		$(this).inputmask("+7 999-999-99-99", {
			skipOptionalPartCharacter: " ",
		});
	});
	if ($("._mask-count").length) {
		var mc = new Cleave("._mask-count", {
			numeral: true,
			delimiter: " ",
			numeralThousandsGroupStyle: "thousand",
		});
	}
	if ($("._mask-price").length) {
		var mp = new Cleave("._mask-price", {
			numeral: true,
			delimiter: " ",
			prefix: " руб",
			tailPrefix: true,
			noImmediatePrefix: true,
			numeralThousandsGroupStyle: "thousand",
		});
	}
	if ($("._mask-date").length) {
		var md = new Cleave("._mask-date", {
			date: true,
			delimiter: ".",
			datePattern: ["d", "m", "Y"],
		});
	}
}
