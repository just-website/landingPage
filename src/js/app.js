import './../scss/style.scss';
import 'owl.carousel';
import Counter from  './countDown';

//форма заказа 
(function($formButton) {
    if (!$formButton.length) {
        return;
    }

    const $form = $('.j-order-form');
    const $wrapper = $('.j-form-order-wrapper'); 
    
    $formButton.on('click', function() {
        $wrapper.show('fast');
        $('html, body').animate({
            scrollTop: $('body').offset().top
        }, 250);
    });

    $wrapper.on('click', function(event) {
        if ($(event.target).closest('form').length) {
            return;
        }
        $(this).hide('fast');
    });

    $form.on('submit', function(event) {
        event.preventDefault();
        const formData = $form.serialize();
        console.log(formData);//тут должен быть обработчик формы
    });
})($('.j-order'));

//слайдер
(function($slider) {
    if (!$slider.length) {
        return;
    }

    $('.j-feedback-btn').on('click', function() {
        $('.j-feedback').show('fast');
        $('html, body').animate({ 
            scrollTop: $('body').offset().top 
        }, 250);
        
    });

    $('.feedback__overlay').on('click', function (event) {
        if ($(event.target).closest('.j-slider').length) {
            return;
        }
        $('.j-feedback').hide('fast');
    });

    $slider.owlCarousel({
        loop: true,
        nav: true,
        responsive: {
            0: {
                items: 1
            }
        },
        navText: ["<img src='www/img/button_left.png'>", "<img src='www/img/button_right.png'>"]
    });
})($('.j-slider'));

//обратный отсчёт 
(function($count) {
    if (!$count.length) {
        return;
    }

    const counter = new Counter($count, '0-3-10-15'); // в формате "дней-часов-минут-секунд"
    counter.init();
    
})($('.j-count'));