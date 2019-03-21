import 'jquery-circle-progress';
import Counter from './countTimer';

const viewSetting = {
    value: 1,
    fill: { gradient: ['orange', 'red'] },
    emptyFill: 'rgba(165, 42, 42, .5)',
    thickness: '15',
    animation: false,
    reverse: false,
    startAngle: 4.7
};

export default class Countdown {
    constructor($wrapper, time) {
        this.$hour = $wrapper.find('.j-circle-hour');
        this.$minut = $wrapper.find('.j-circle-minut');
        this.$second = $wrapper.find('.j-circle-second');
        this.setting = viewSetting;
        this.countSetting = this.setCountSetting(time);
        this.counter = new Counter(this.countSetting);
    }
    
    init() {
        this.$hour.circleProgress(viewSetting);
        this.$minut.circleProgress(viewSetting);
        this.$second.circleProgress(viewSetting);
        this.bindEvents();
    }

    bindEvents() {
        this.$hour.on('tick', (event) => {
            const value = 100 / 12 * event.detail.param;
            this.$hour.circleProgress({value: value / 100});
        });

        this.$minut.on('tick', (event) => {
            const value = 100 / 60 * event.detail.param;
            this.$minut.circleProgress({ value: value / 100 });
        });

        this.$second.on('tick', (event) => {
            const value = 100 / 60 * event.detail.param;
            this.$second.circleProgress({ value: value / 100 });
        });
    }

    setCountSetting(time) {
        const countSetting = {
            hourEl: this.$hour.find('p').get()[0],
            minutsEl: this.$minut.find('p').get()[0],
            secondEl: this.$second.find('p').get()[0],
            date: time,
            autoStart: true
        };
        return countSetting;
    }
}