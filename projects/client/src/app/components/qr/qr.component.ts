import {Component, Inject, OnInit} from '@angular/core';
import {QrClient} from '../../interfaces/qr-client';
import {take} from 'rxjs/operators';
import {SocketsService} from 'lib-sockets/src/lib/services/sockets.service';
import {API_URL} from '../../tokens/api-url';

@Component({
    selector: 'app-qr',
    templateUrl: './qr.component.html',
    styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit {

    constructor(private readonly socketsService: SocketsService, @Inject(API_URL) private readonly apiUrl: string) {
    }

    public ngOnInit(): void {
        this.socketsService.registerHandler<QrClient, 'GeneratedQrUrl'>('GeneratedQrUrl', (url: string) => {
            console.log(url);
        }).subscribe();
        this.socketsService.invoke<string>('GenerateQrUrl', this.apiUrl).pipe(take(1)).subscribe();
    }
}
