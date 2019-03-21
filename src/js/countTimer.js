//функцию писал наверное год назад (пригодилась в итоге, чуть дополнил), прошу строго не судить за кодстайл...

function Count(option) {

    this.autoStart = function () {
        if (option.autoStart) {
            Count.prototype.startEvent.call(this);
        }
    }.call(this),

        this.elems = { // DOM-элементы, с которыми работаем
            dayEl: option.dayEl,
            hourEl: option.hourEl,
            minutsEl: option.minutsEl,
            secondEl: option.secondEl,
            eventElem: option.eventElem
        },

        this.date = { // парсим принятую дату
            days: option.date.split('-')[0],
            hours: option.date.split('-')[1],
            minuts: option.date.split('-')[2],
            seconds: option.date.split('-')[3],
        },

        this.startCounter(this), // это норм так писать?

        this.counter = this.setCounter(); // получаем количество секунд

}


Count.prototype.startCounter = function (obj) {
    if (obj.elems.eventElem) {
        obj.elems.eventElem.addEventListener('click', function start() {
            Count.prototype.startEvent.call(obj);
            obj.elems.eventElem.removeEventListener('click', start);
        });
    }
};

Count.prototype.setCounter = function () { // можно ли упростить?
    var countDate = new Date();
    countDate.setDate(countDate.getDate() + (+this.date.days));
    countDate.setHours(countDate.getHours() + (+this.date.hours));
    countDate.setMinutes(countDate.getMinutes() + (+this.date.minuts));
    countDate.setSeconds(countDate.getSeconds() + (+this.date.seconds));
    return (countDate - new Date()) / 1000;
};

Count.prototype.startEvent = function () { // можно ли упростить?
    // var that = this;
    var startInterval = setInterval((function () {
        this.setTimer();
        if (this.counter < 1) {
            this.endEvent();
            clearInterval(startInterval);
        }
        this.counter--;
    }).bind(this), 1000);
};

Count.prototype.setTimer = function () {
    var temp = this.counter; // для упрощения подсчётов используем промежуточный результат
    if (this.elems.dayEl) {
        this.elems.dayEl.innerHTML = Math.floor(temp / 60 / 60 / 24);
        temp -= this.elems.dayEl.innerHTML * 60 * 60 * 24;
    }
    this.elems.hourEl.innerHTML = Math.floor(temp / 60 / 60);
    this.createTickEvent(this.elems.hourEl, Math.floor(temp / 60 / 60));
    temp -= this.elems.hourEl.innerHTML * 60 * 60;
    this.elems.minutsEl.innerHTML = Math.floor(temp / 60);
    this.createTickEvent(this.elems.minutsEl, Math.floor(temp / 60));
    temp -= this.elems.minutsEl.innerHTML * 60;
    this.elems.secondEl.innerHTML = Math.floor(temp);
    this.createTickEvent(this.elems.secondEl, Math.floor(temp));
};

Count.prototype.createTickEvent = function(elem, param) {
    var event = new CustomEvent('tick', {
        detail: { 
            param: param 
        },
        bubbles: true
    });

    elem.dispatchEvent(event);
};

Count.prototype.endEvent = function () {
    alert('Test');
};

Count.prototype.start = function (obj) {
    return function () {
        Count.prototype.startEvent.call(obj);
    };
};

export default Count;
// api
// var params = { // передаём параметры
//     dayEl: document.querySelector('.days'),
//     hourEl: document.querySelector('.hours'),
//     minutsEl: document.querySelector('.minuts'),
//     secondEl: document.querySelector('.seconds'),
//     eventElem: document.querySelector('button'),
//     date: '0-1-0-5', // в формате "дней-часов-минут-секунд"
//     autoStart: false
// };

// var timer1 = new Count(params);
