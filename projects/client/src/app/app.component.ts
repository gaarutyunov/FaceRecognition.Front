import {Component, OnInit} from '@angular/core';
import {SocketsService} from 'lib-sockets/src/lib/services/sockets.service';
import {SessionService} from './services/session.service';
import {take} from 'rxjs/operators';
import {QrClient} from './interfaces/qr-client';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private readonly socketsService: SocketsService;
    private readonly sessionService: SessionService;

    constructor(socketsService: SocketsService, sessionService: SessionService) {
        this.socketsService = socketsService;
        this.sessionService = sessionService;
    }

    ngOnInit(): void {
        this.sessionService.loadSession();
        this.socketsService.initConnection().pipe(take(1)).subscribe();
    }
}
