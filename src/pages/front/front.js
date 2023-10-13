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
