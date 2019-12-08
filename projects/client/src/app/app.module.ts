import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SocketsModule} from 'lib-sockets/src/lib/sockets.module';
import {environment} from '../environments/environment';
import {SessionService} from './services/session.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {API_URL} from './tokens/api-url';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { QrComponent } from './components/qr/qr.component';
import { FrComponent } from './components/fr/fr.component';
import {WebcamModule} from 'ngx-webcam';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule, MatInputModule, MatDialogModule
} from '@angular/material';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import {BreadcrumbModule} from 'angular-crumbs';
import { CaptureComponent } from './components/capture/capture.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        NotFoundComponent,
        QrComponent,
        FrComponent,
        NavigationComponent,
        CaptureComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SocketsModule.forRoot(
            environment.baseUrl + environment.hubUrl,
            SessionService),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        WebcamModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        LayoutModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        BreadcrumbModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule
    ],
    providers: [
        SessionService,
        {
            provide: API_URL,
            useValue: environment.baseUrl
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        CaptureComponent
    ]
})
export class AppModule {
}
