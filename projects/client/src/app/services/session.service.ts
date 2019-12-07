import {Injectable} from '@angular/core';
import {SessionFacade} from 'lib-sockets/src/lib/interfaces/session-facade';
import {BehaviorSubject, Observable} from 'rxjs';
import {Null} from 'common/types/null';

@Injectable()
export class SessionService extends SessionFacade {
    private static ACCESS_TOKEN: string = 'access_token';

    get $accessToken$(): Observable<Null<string>> {
        return this.accessTokenSubject.asObservable();
    }

    get $loaded$(): Observable<boolean> {
        return this.loadedSubject.asObservable();
    }

    private readonly accessTokenSubject: BehaviorSubject<Null<string>>;
    private readonly loadedSubject: BehaviorSubject<boolean>;

    constructor() {
        super();
        this.accessTokenSubject = new BehaviorSubject<Null<string>>(null);
        this.loadedSubject = new BehaviorSubject<boolean>(false);
    }

    public loadSession(): void {
        const token: string = localStorage.getItem(SessionService.ACCESS_TOKEN);
        this.accessTokenSubject.next(token);
        this.loadedSubject.next(true);
    }
}
