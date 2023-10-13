const argv = require("yargs").argv;
const gulp = require("gulp");
const path = require("path");
const fs = require("fs");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const gulpif = require("gulp-if");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const gcmq = require("gulp-group-css-media-queries");
const pug = require("gulp-pug");
const bemValidator = require("gulp-html-bem-validator");
const replace = require("gulp-replace");
const uglify = require("gulp-uglify");
const newer = require("gulp-newer");
const concat = require("gulp-concat");
const webp = require("gulp-webp");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync").create();
const p = {
	docs: {
		html: "docs/",
		js: "docs/js/",
		json: "docs/json/",
		css: "docs/css/",
		img: "docs/img/",
		video: "docs/video/",
		audio: "docs/audio/",
		fonts: "docs/fonts/",
	},
	src: {
		vendor: "src/vendors",
		pages: "src/pages",
		img: "src/img",
		component: "src/components",
		layout: "src/layout",
		vendors: "src/vendors",
	},
	clean: "docs",
};

const isDev = function () {
	return !argv.prod;
};
const isProd = function () {
	return !!argv.prod;
};

gulp.task("scss", function () {
	return (
		gulp
			.src([
				"src/css/mixin.scss",
				"src/css/reset.scss",
				"src/css/variables.scss",
				"src/css/fonts.scss",
				"src/css/base.scss",
				"src/css/typogrphy.scss",
				p.src.component + "/**/*.scss",
				p.src.pages + "/**/*.scss",
			])
			.pipe(concat("style.scss"))
			// .pipe(gulpif(isDev(), sourcemaps.init()))
			.pipe(sass())
			.pipe(autoprefixer({}))
			.pipe(gcmq())
			// .pipe(gulpif(isDev(), sourcemaps.write()))

			.pipe(gulpif(isProd(), gulp.dest(p.docs.css)))
			.pipe(gulpif(isProd(), csso()))

			.pipe(rename({ suffix: ".min" }))
			.pipe(gulp.dest(p.docs.css))
			.pipe(browserSync.reload({ stream: true }))
	);
});

// обработка vendor js
gulp.task("vendor-js", function () {
	return gulp
		.src(p.src.vendor + "/**/*.js")
		.pipe(plumber())
		.pipe(concat("vendor.js"))
		.pipe(gulp.dest(p.docs.js))
		.pipe(browserSync.reload({ stream: true }));
});

// обработка vendor css
gulp.task("vendor-css", function () {
	return gulp
		.src(p.src.vendor + "/**/*.css")
		.pipe(plumber())
		.pipe(concat("vendor.css"))
		.pipe(gulp.dest(p.docs.css))
		.pipe(browserSync.reload({ stream: true }));
});
// получение папок
function getFolders(dir) {
	return fs.readdirSync(dir).filter(function (file) {
		return fs.statSync(path.join(dir, file)).isDirectory();
	});
}
gulp.task("pug-mixin", function (done) {
	return gulp
		.src("src/**/*.mixin")

		.pipe(plumber())
		.pipe(concat("mixin.pug"))
		.pipe(gulp.dest(p.src.layout));
});
gulp.task("page", function (done) {
	var folders = getFolders(p.src.pages);
	if (folders.length === 0) return done(); // nothing to do!
	var tasks = folders.map(function (folder) {
		return (
			gulp
				.src(path.join(p.src.pages, folder, "/*.pug"))
				.pipe(
					newer({
						dest: p.docs.html + "/" + folder + ".html",
						extra: path.join(p.src.pages, folder, "/**/*.pug"),
					})
				)
				.pipe(plumber())
				.pipe(pug({ pretty: true }))
				.pipe(bemValidator())
				.pipe(replace("{{template-name}}", folder))
				// .pipe(rename(folder + ".html"))
				.pipe(gulp.dest(p.docs.html))
				.pipe(browserSync.reload({ stream: true }))
		);
	});
	done();
});
gulp.task("pug-layout", function (done) {
	var folders = getFolders(p.src.pages);
	if (folders.length === 0) return done(); // nothing to do!
	var tasks = folders.map(function (folder) {
		return (
			gulp
				.src(path.join(p.src.pages, folder, "/*.pug"))

				.pipe(plumber())
				.pipe(pug({ pretty: true }))
				.pipe(bemValidator())
				.pipe(replace("{{template-name}}", folder))
				// .pipe(rename(folder + ".html"))
				.pipe(gulp.dest(p.docs.html))
				.pipe(browserSync.reload({ stream: true }))
		);
	});
	done();
});

gulp.task("js", function (done) {
	return gulp
		.src([p.src.pages + "/**/*.js", p.src.component + "/**/*.js"])
		.pipe(plumber())
		.pipe(concat("main.js"))
		.pipe(gulp.dest(p.docs.js))
		.pipe(uglify())
		.pipe(rename("main.min.js"))
		.pipe(gulp.dest(p.docs.js))
		.pipe(browserSync.reload({ stream: true }));
});
// обработка WEBP
gulp.task("webp-all", function () {
	return gulp
		.src(p.src.img + "/*.{png,jpg}")
		.pipe(gulp.dest(p.docs.img))
		.pipe(webp())
		.pipe(gulp.dest(p.docs.img));
});
gulp.task("webp", function () {
	return gulp
		.src(p.src.img + "/*.{png,jpg}")
		.pipe(newer(p.docs.img))
		.pipe(gulp.dest(p.docs.img))
		.pipe(webp())
		.pipe(gulp.dest(p.docs.img))
		.pipe(browserSync.reload({ stream: true }));
});

// обработка svg
gulp.task("svg", function () {
	return gulp.src(p.src.img + "/*.svg").pipe(gulp.dest(p.docs.img));
});

gulp.task("listing", function (done) {
	var content =
		"<html><head><meta content='width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' name='viewport'></head><body style='background:#212121'><style>a{font-family: Arial; color: white;font-size: 17px; }ul{   color: #fff; max-width:1000px; list-style: square; margin: 30px auto; border: 1px solid #00ff7e;  padding: 10px 40px;box-sizing: border-box;} a:hover{text-decoration:none;}</style><ul style=''>";
	fs.readdirSync("./docs/").forEach((file) => {
		if (file.split(".").pop() == "html") {
			content =
				content +
				"<li  style='margin:15px 0'>  <a href='" +
				file +
				"' >" +
				file +
				"</a></li>";
		}
	});
	fs.writeFile("docs/index.html", content, function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Файл создан");
		}
	});
	done();
});
gulp.task("serve", function () {
	browserSync.init({
		server: {
			baseDir: "docs",
		},
	});
	// gulp.watch(["docs/**/*.{css,js}", "docs/*.html"]).on(
	// 	"change",
	// 	browserSync.reload
	// );
});
gulp.task("create", function (done) {
	const name = process.argv[4];
	const type = process.argv[3];
	const jsContent = "$(function(){})";
	if (type == "--page" || type == "--p") {
		let dir = p.src.pages + "/" + name;
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
			fs.writeFile(dir + "/" + name + ".mixin", "", function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Mixin файл создан");
				}
			});
			fs.writeFile(dir + "/" + name + ".pug", "", function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Pug файл создан");
				}
			});
			fs.writeFile(dir + "/" + name + ".scss", "", function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Scss файл создан");
				}
			});
			fs.writeFile(dir + "/" + name + ".js", jsContent, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Js файл создан");
				}
			});
			console.log("Создание папки ", name);
		}
	} else if (type == "--component" || type == "--c") {
		let dir = p.src.component + "/" + name;
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
			fs.writeFile(dir + "/" + name + ".pug", "", function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Pug файл создан");
				}
			});
			fs.writeFile(dir + "/" + name + ".mixin", "", function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Mixin файл создан");
				}
			});
			fs.writeFile(dir + "/" + name + ".scss", "", function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Scss файл создан");
				}
			});
			fs.writeFile(dir + "/" + name + ".js", jsContent, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Js файл создан");
				}
			});
			console.log("Создание компонента ", name);
		}
	} else {
		console.log("Ничего не созданно");
	}

	done();
});
gulp.task("watch", function () {
	gulp.watch("src/**/*.mixin", gulp.series("pug-mixin"));
	gulp.watch("src/**/*.scss", gulp.parallel("scss"));
	gulp.watch(
		[p.src.component + "/**/*.pug", p.src.layout + "/**/*.pug"],
		gulp.series("pug-layout")
	);
	gulp.watch(p.src.pages + "/**/*.pug", gulp.parallel("page"));
	gulp.watch(p.src.vendors, gulp.parallel("vendor-js"));
	gulp.watch(p.src.vendors, gulp.parallel("vendor-css"));

	gulp.watch(p.src.img + "/*.svg", gulp.parallel("svg"));
	gulp.watch(p.src.img + "/*.{png,jpg}", gulp.parallel("webp"));

	gulp.watch(["src/**/*.js"], gulp.parallel("js"));

	gulp.watch("docs/*.html").on("add", gulp.parallel("listing"));
});
gulp.task("default", gulp.parallel("watch", "serve"));
// exports.default = browsersync;
