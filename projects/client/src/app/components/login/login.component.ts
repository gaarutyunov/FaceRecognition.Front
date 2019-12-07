import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {take} from 'rxjs/operators';
import {TokenResponse} from '../../models/token-response';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public readonly formGroup: FormGroup;
    public name: string = 'login';
    private readonly authService: AuthService;

    constructor(authService: AuthService) {
        this.formGroup = new FormGroup({
            login: new FormControl(''),
            password: new FormControl('')
        });
        this.authService = authService;
    }

    public login(): void {
        const {
            login,
            password
        } = this.formGroup.controls;
        const next: (token: TokenResponse) => void = (token: TokenResponse) => {
            console.log(token);
        };
        const errorFn: (error: HttpErrorResponse) => void = (error: HttpErrorResponse) => {
            console.log(error);
        };
        const completeFn: () => void = () => {
            console.log('complete');
        };
        this.authService.login(login.value, password.value).pipe(
            take(1)
        ).subscribe(next, errorFn, completeFn);
    }
}

