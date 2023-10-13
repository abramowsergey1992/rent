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
