import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    public name: string = 'home';
    constructor() {
    }

    ngOnInit() {
        console.log('init');
    }

    ngOnDestroy(): void {
        console.log('destroy');
    }
}
