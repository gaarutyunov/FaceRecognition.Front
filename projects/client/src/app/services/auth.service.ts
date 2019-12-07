import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {UserResponse} from '../models/user-response';
import {API_URL} from '../tokens/api-url';
import {RegisterRequest} from '../models/register-request';
import {catchError, map} from 'rxjs/operators';
import {TokenResponse} from '../models/token-response';
import {LoginRequest} from '../models/login-request';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly http: HttpClient;
    private readonly apiUrl: string;

    constructor(http: HttpClient, @Inject(API_URL) apiUrl: string) {
        this.http = http;
        this.apiUrl = apiUrl;
    }

    public register(login: string, password: string): Observable<UserResponse> {
        return this.http.post<UserResponse>(this.apiUrl + 'User/Register', new RegisterRequest(login, password)).pipe(
            map((user: UserResponse) => new UserResponse(user.id, user.login)),
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                return throwError(error);
            })
        );
    }

    public login(login: string, password: string): Observable<TokenResponse> {
        return this.http.post<TokenResponse>( this.apiUrl + 'User/Login', new LoginRequest(login, password)).pipe(
            map((tokenResponse: TokenResponse) => new TokenResponse(tokenResponse.token)),
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                return throwError(error);
            })
        );
    }
}
