import { Injectable } from '@angular/core';
import {from, Observable, of, ReplaySubject} from 'rxjs';
import {HubConnection, HubConnectionBuilder, HubConnectionState, IHttpConnectionOptions} from '@aspnet/signalr';
import {MethodMap} from '../interfaces';
import {Undefined} from 'common/types/undefined';
import {filter, map, mergeMap, shareReplay, take} from 'rxjs/operators';

@Injectable()
export class SignalRService {

    private readonly connection: ReplaySubject<Undefined<HubConnection>>;

    constructor() {
        this.connection = new ReplaySubject<Undefined<HubConnection>>(1);
        this.connection.next(undefined);
    }

    public initConnection(url: string, options?: IHttpConnectionOptions): Observable<void> {
        return this._initConnection(url, options);
    }

    public registerHandler<TMap extends MethodMap, TKey extends keyof TMap>(methodName: TKey,
                                                                            method: TMap[TKey]): Observable<void> {
        return this._registerHandler(methodName, method);
    }

    public invoke<T>(methodName: string, args: any[]): Observable<T> {
        return this.connection.pipe(
            filter((conn: Undefined<HubConnection>) => !!conn),
            take(1),
            mergeMap((conn: Undefined<HubConnection>) => {
                if (args.length > 0) {
                    return from((conn as HubConnection).invoke(methodName, args));
                }
                return from((conn as HubConnection).invoke(methodName));
            })
        );
    }

    private _getConnection(url: string, options?: IHttpConnectionOptions): Observable<HubConnection> {
        return this.connection.pipe(
            take(1),
            map((connection: Undefined<HubConnection>) => {
                if (!!connection) {
                    return connection;
                } else {
                    const hubConnection: HubConnection = this._openConnection(url, options);
                    this.connection.next(hubConnection);
                    return hubConnection;
                }
            }),
            shareReplay(1)
        );
    }

    private _initConnection(url: string, options?: IHttpConnectionOptions): Observable<void> {
        return this._getConnection(url, options).pipe(
            filter((conn: HubConnection) => !!conn),
            mergeMap((conn: HubConnection) => {
                if (conn.state === HubConnectionState.Connected) {
                    return of<void>();
                } else {
                    return from(conn.start());
                }
            })
        );
    }

    private _openConnection(url: string, options?: IHttpConnectionOptions): HubConnection {
        return new HubConnectionBuilder()
            .withUrl(url, !!options ? options : {})
            .build();
    }

    private _registerHandler<TMap extends MethodMap, TKey extends keyof TMap>(methodName: TKey,
                                                                              method: TMap[TKey]): Observable<void> {
        return this.connection.pipe(
            filter((conn: Undefined<HubConnection>) => !!conn),
            take(1),
            map((conn: Undefined<HubConnection>) => {
                (conn as HubConnection).on(methodName as string, method);
            })
        );
    }
}
