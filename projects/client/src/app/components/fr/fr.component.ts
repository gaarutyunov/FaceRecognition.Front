import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WebcamImage} from 'ngx-webcam';

@Component({
    selector: 'app-fr',
    templateUrl: './fr.component.html',
    styleUrls: ['./fr.component.scss']
})
export class FrComponent implements OnInit {
    get capture$(): Observable<void> {
        return this._captureSubject.asObservable();
    }

    private readonly _captureSubject: Subject<void>;

    constructor() {
        this._captureSubject = new Subject<void>();
    }

    ngOnInit() {
    }

    public imageCaptured(image: WebcamImage) {
        console.log(image);
    }

    public capture(): void {
        this._captureSubject.next();
    }
}
