import {Observable} from 'rxjs';
import {Null} from 'common/types/null';

export abstract class SessionFacade {
    abstract get $loaded$(): Observable<boolean>;
    abstract get $accessToken$(): Observable<Null<string>>;
}
