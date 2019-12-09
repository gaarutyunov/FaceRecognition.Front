import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {take} from 'rxjs/operators';
import {TokenResponse} from '../../models/token-response';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CaptureComponent} from '../capture/capture.component';
import {UserResponse} from '../../models/user-response';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public formGroup: FormGroup = new FormGroup({
        login: new FormControl(''),
        password: new FormControl(''),
        file: new FormControl('')
    });

    private matDialogRef: MatDialogRef<CaptureComponent>;
    @ViewChild('imageElement', { static: false }) private imageElement: ElementRef<HTMLImageElement>;

    constructor(
        private readonly authService: AuthService,
        private readonly matDialog: MatDialog) {
        this.authService = authService;
    }

    public login(): void {
        const {
            login,
            password,
            file
        } = this.formGroup.controls;
        this.authService.login(login.value, password.value, file.value).pipe(
            take(1)
        ).subscribe((token: TokenResponse) => {
            console.log(token);
        });
    }

    public capture(): void {
        this.matDialogRef = this.matDialog.open(CaptureComponent);

        this.matDialogRef.afterClosed().subscribe((res: string) => {
            this.formGroup.controls.file.setValue(res);
            this.imageElement.nativeElement.src = res;
        });
    }
}

