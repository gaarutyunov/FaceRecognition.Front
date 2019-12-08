import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SOCKETS_URL} from '../constants';
import {SignalRService} from './signal-r.service';
import {MethodMap} from '../interfaces';
import {Undefined} from 'common/types/undefined';
import {IHttpConnectionOptions} from '@aspnet/signalr';
import {filter, map, mergeMap, take} from 'rxjs/operators';
import {Null} from 'common/types/null';
import {SessionFacade} from '../interfaces/session-facade';

@Injectable()
export class SocketsService {

    constructor(@Inject(SOCKETS_URL) private readonly socketsUrl: string,
                private readonly signalR: SignalRService,
                private readonly sessionFacade: SessionFacade) {
    }

    public initConnection(): Observable<void> {
        return this._initConnection();
    }

    public invoke<T>(methodName: string, ...args: any[]): Observable<T> {
        return this.signalR.invoke<T>(methodName, ...args);
    }

    public registerHandler<TMap extends MethodMap, TKey extends keyof TMap>(methodName: TKey,
                                                                            method: TMap[TKey]): Observable<void> {
        return this.signalR.registerHandler(methodName, method);
    }

    private _constructOptions(): Observable<Undefined<IHttpConnectionOptions>> {
        return this.sessionFacade.$loaded$.pipe(
            filter((isLoaded: boolean) => isLoaded),
            mergeMap(() => this.sessionFacade.$accessToken$),
            take(1),
            map((token: Null<string>) => {
                if (!!token) {
                    return {
                        accessTokenFactory: () => token
                    };
                }
                return undefined;
            })
        );
    }

    private _initConnection(): Observable<void> {
        return this._constructOptions().pipe(
            take(1),
            mergeMap((options: Undefined<IHttpConnectionOptions>) => {
                return this.signalR.initConnection(this.socketsUrl, options);
            }),
            take(1)
        );
    }
}
