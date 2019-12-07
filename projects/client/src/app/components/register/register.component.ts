import {Component, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {take} from 'rxjs/operators';
import {UserResponse} from '../../models/user-response';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class RegisterComponent {
    public name: string = 'register';

    public formGroup: FormGroup = new FormGroup({
        login: new FormControl(''),
        password: new FormControl('')
    });

    private readonly authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public register(): void {
        const {
            login,
            password
        } = this.formGroup.controls;
        this.authService.register(login.value, password.value).pipe(
            take(1)
        ).subscribe((user: UserResponse) => {
            console.log(user);
        });
    }
}
