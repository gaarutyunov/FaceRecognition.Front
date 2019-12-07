import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {SocketsService} from './services/sockets.service';
import {SignalRService} from './services/signal-r.service';
import {SOCKETS_URL} from './constants';
import {SessionFacade} from './interfaces/session-facade';


@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [
        SocketsService,
        SignalRService
    ]
})
export class SocketsModule {
    public static forRoot<TFacade extends SessionFacade>(
        socketsUrl: string,
        sessionFacade: Type<TFacade>): ModuleWithProviders {
        return {
            ngModule: SocketsModule,
            providers: [
                {
                    provide: SOCKETS_URL,
                    useValue: socketsUrl
                },
                {
                    provide: SessionFacade,
                    useExisting: sessionFacade
                }
            ]
        };
    };
}
