import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {take} from 'rxjs/operators';
import {UserResponse} from '../../models/user-response';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CaptureComponent} from '../capture/capture.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class RegisterComponent {
    public formGroup: FormGroup = new FormGroup({
        login: new FormControl(''),
        password: new FormControl(''),
        repeatPassword: new FormControl(''),
        file: new FormControl('')
    });

    private matDialogRef: MatDialogRef<CaptureComponent>;
    @ViewChild('imageElement', { static: false }) private imageElement: ElementRef<HTMLImageElement>;

    constructor(
        private readonly authService: AuthService,
        private readonly matDialog: MatDialog) {
        this.authService = authService;
    }

    public register(): void {
        const {
            login,
            password,
            file
        } = this.formGroup.controls;
        this.authService.register(login.value, password.value, file.value).pipe(
            take(1)
        ).subscribe((user: UserResponse) => {
            console.log(user);
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
