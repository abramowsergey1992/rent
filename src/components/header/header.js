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
