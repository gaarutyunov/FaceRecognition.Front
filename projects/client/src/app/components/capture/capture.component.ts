import {Component, OnInit} from '@angular/core';
import {WebcamImage} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-capture',
    templateUrl: './capture.component.html',
    styleUrls: ['./capture.component.scss']
})
export class CaptureComponent implements OnInit {
    get capture$(): Observable<void> {
        return this._captureSubject.asObservable();
    }

    private readonly _captureSubject: Subject<void>;

    constructor(private readonly matDialogRef: MatDialogRef<CaptureComponent>) {
        this._captureSubject = new Subject<void>();
    }

    ngOnInit() {
    }

    public imageCaptured(image: WebcamImage) {
        this.matDialogRef.close(image.imageAsDataUrl);
    }

    public capture(): void {
        this._captureSubject.next();
    }

}
