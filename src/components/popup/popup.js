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
