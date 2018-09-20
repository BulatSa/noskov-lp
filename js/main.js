/***********************
 Отправка формы в php BEGIN
 ***********************/
$(function () {
	$(".ajax-form").on("submit", function (event) {
		var form = $(this);
		var send = true;
		event.preventDefault();

		$(this).find("[data-req='true']").each(function () {
			if ($(this).val() === "") {
				$(this).addClass('error');
				send = false;
			}
			if ($(this).is('select')) {
				if ($(this).val() === null) {
					$(this).addClass('error');
					send = false;
				}
			}
			if ($(this).is('input[type="checkbox"]')) {
				if ($(this).prop('checked') !== true) {
					$(this).addClass('error');
					send = false;
				}
			}
			if ($(this).is('input[type="tel"]')) {
				console.log($(this).cleanVal().length);
				if ($(this).cleanVal().length < 10) {
					$(this).addClass('error');
					send = false;
				}
			}
		});

		$(this).find("[data-req='true']").on('focus', function () {
			$(this).removeClass('error');
		});

		// empty file inputs fix for mac
		var fileInputs = $('input[type="file"]:not([disabled])', form);
		fileInputs.each(function (_, input) {
			if (input.files.length > 0) return;
			$(input).prop('disabled', true)
		});

		var form_data = new FormData(this);

		fileInputs.prop('disabled', false);

		$("[data-label]").each(function () {
			var input_name = $(this).attr('name');
			var input_label__name = input_name + '_label';
			var input_label__value = $(this).data('label').toString();
			form_data.append(input_label__name, input_label__value)
		});

		if (send === true) {
			$.ajax({
				type: "POST",
				async: true,
				url: "/send.php",
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,
				success: (function (result) {
					console.log(result);
					$.fancybox.close();
					if (result.indexOf("Mail FAIL") !== -1) {
						$.fancybox.open({src: '#modal-error'});
					} else {
						$.fancybox.open({src: '#modal-thanks'});
						setTimeout(function () {
							$.fancybox.close();
						}, 4500);
						form[0].reset();
					}
				})
			});
		}
	});
});
/***********************
 Отправка формы в php END
 ***********************/


/***********************
 Input mask BEGIN
 ***********************/
$(function () {
	$("input[type='tel']").mask("+7 (000) 000-00-00");
});
/***********************
 Input mask END
 ***********************/


/***********************
 fancybox BEGIN
 ***********************/
$.fancybox.defaults.backFocus = false;
$.fancybox.defaults.lang = 'ru';
$.fancybox.defaults.i18n =
	{
		'ru': {
			CLOSE: 'Закрыть',
			NEXT: 'Дальше',
			PREV: 'Назад',
			ERROR: 'Не удается загрузить. <br/> Попробуйте позднее.',
			PLAY_START: 'Начать слайдшоу',
			PLAY_STOP: 'Остановить слайдшоу',
			FULL_SCREEN: 'На весь экран',
			THUMBS: 'Превью'
		}
	};

function init_fancy() {
	$().fancybox({
		selector: '.fancy',
		buttons: ['close']
	});
	$().fancybox({
		selector: '.fancy-modal',
		touch: false
	});
	$().fancybox({
		selector: '.fancy-map',
		toolbar: false,
		smallBtn: true,
		defaultType: "iframe"
	});
}

function init_fancy__video() {
	$().fancybox({
		selector: '.fancy-video',
		toolbar: false,
		smallBtn: true,
		youtube: {
			controls: 1,
			showinfo: 0,
			autoplay: 1
		}
	});
}

$(function () {
	init_fancy();
	init_fancy__video();
});
/***********************
 fancybox END
 ***********************/


/***********************
 Прокрутка к секциям BEGIN
 ***********************/
$(function () {
	$('.scrollto').on('click', function () {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top - 30;

		$('.hamburger').removeClass('is-active');
		$('.mobile-menu-wrap').removeClass('opened');

		$('html,body').stop().animate({scrollTop: destination}, 1000);
		return false;
	});
});
/***********************
 Прокрутка к секциям END
 ***********************/


/***********************
 Waypoints BEGIN
 ***********************/
$(function () {
	$('.anim').waypoint(function () {
		$(this.element).toggleClass('animated');
	}, {
		offset: '85%'
	});

	$(window).on('scroll',function () {
		if ($(this).scrollTop() > 40){
			$('.header-sec').addClass('active');
		} else {
			$('.header-sec').removeClass('active');
		}
	});
});
/***********************
 Waypoints END
 ***********************/


/***********************
 Mobile menu BEGIN
 ***********************/
$(function(){
	$('.hamburger').on('click',function (e) {
		$(this).toggleClass('is-active');
		$('.mobile-menu-wrap').toggleClass('opened');
	});

	$(document).on('click touchstart',function (e) {
		var div = $(".hamburger,.mobile-menu-wrap");
		if (!div.is(e.target) && div.has(e.target).length === 0){
			$('.hamburger').removeClass('is-active');
			$('.mobile-menu-wrap').removeClass('opened');
		}
	});
});
/***********************
 Mobile menu END
 ***********************/


/***********************
Flickity BEGIN
***********************/
$(document).ready(function() {
	$('.deals__slider').flickity({
		contain: true,
		wrapAround: true,
		prevNextButtons: false,
		pageDots: false,
		adaptiveHeight: true
	});
	$('.deals__nav .prev').on('click', function (e) {
		e.preventDefault();
		$('.deals__slider').flickity('previous');
	});
	$('.deals__nav .next').on('click', function (e) {
		e.preventDefault();
		$('.deals__slider').flickity('next');
	});

	$('.recommend__slider').flickity({
		contain: true,
		wrapAround: true,
		prevNextButtons: false,
		pageDots: false,
		adaptiveHeight: true
	});
	$('.recommend__nav .prev').on('click', function (e) {
		e.preventDefault();
		$('.recommend__slider').flickity('previous');
	});
	$('.recommend__nav .next').on('click', function (e) {
		e.preventDefault();
		$('.recommend__slider').flickity('next');
	})
});
/***********************
Flickity END
***********************/


/**************************************************
 Google Maps
 ***************************************************/
$(document).ready(function(){
	if ($('#googlemap').length) {

		google.maps.event.addDomListener(window, 'load', initMap);

		function initMap() {
			var mapOptions = {
				zoom: 16,
				scrollwheel: false,
				zoomControlOptions: {
					position: google.maps.ControlPosition.LEFT_CENTER
				},
				mapTypeControl: false,
				center: new google.maps.LatLng(59.903319, 30.313501)
			};

			var mapElement = document.getElementById('googlemap');

			var map = new google.maps.Map(mapElement, mapOptions);

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(59.903319, 30.313501),
				map: map,
				title: '121170, Москва, ул.Неверовского д. 10 стр. 3А',
				icon: '/img/contact/buble.png'
			});
		}
		initMap();

	}
});
/**************************************************
 End Google Maps
 ***************************************************/