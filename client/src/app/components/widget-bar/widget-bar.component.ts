import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ResizeEvent} from 'angular-resizable-element';
import {$} from 'jquery';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-widget-bar',
    templateUrl: './widget-bar.component.html',
    styleUrls: ['./widget-bar.component.scss'],
})

export class WidgetBarComponent implements OnInit {
    nav = [];
    navBarWidth = '250px';
    yolo = false;

    @Output() addNewWidgetEvent = new EventEmitter<{service: String, widget: String, title: String, icon: String}>();

    constructor() {
        this.nav = [
            this.newTab(`NASA`, 'assets/icons/basic.svg', 'nasa'),
            this.newTab(`Pokemon`, 'assets/icons/pokemon.svg', 'pokemon'),
            this.newSubTab(`Favorite Pokemon`, 'favorite', 'pokemon'),
            this.newTab(`Steam`, 'assets/icons/basic.svg', 'steam'),
            this.newTab(`Twitch`, 'assets/icons/basic.svg', 'twitch'),
            this.newTab(`Twitter`, 'assets/icons/twitter.svg', 'twitter'),
            this.newTab(`Weather`, 'assets/icons/weather.svg', 'weather'),
            this.newTab(`Youtube`, 'assets/icons/youtube.svg', 'youtube')
        ];
    }

    ngOnInit() {
    }

    newTab(name, svg, label) {
        return {name: name, svg: svg, label: label, parent: null, extended: false};
    }

    newSubTab(name, label, parent) {
        return {name: name, svg: null, label: label, parent: parent, extended: false};
    }

    switchService(elem) {
        elem.extended = !elem.extended;
        this.nav.forEach(function (value) {
            if (value.parent === elem.label) {
                value.extended = elem.extended;
            }
        });
    }

    addNewWidget(elem) {

        this.nav.forEach(function (value, ) {
            if (value.label === elem.parent) {
                const test = {
                    service: elem.parent,
                    widget: elem.label,
                    title: value.name + ' : ' + elem.name,
                    icon: value.svg};
                this.addNewWidgetEvent.emit(test);
                return value.extended;
            }
        }.bind(this));
        return false;
    }

    onResizeEnd(event: ResizeEvent): void {
        this.navBarWidth = event.rectangle.right + 'px';
    }
}
