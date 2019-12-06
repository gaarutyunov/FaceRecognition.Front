import {Component, OnInit} from '@angular/core';
import {SocketsService} from 'lib-sockets/src/lib/services/sockets.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'client';

    private readonly _socketsService: SocketsService;

    constructor(socketsService: SocketsService) {
        this._socketsService = socketsService;
    }

    ngOnInit(): void {
    }


}
