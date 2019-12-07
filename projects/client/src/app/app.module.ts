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

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SocketsModule.forRoot(
            environment.baseUrl + environment.hubUrl,
            SessionService),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        SessionService,
        {
            provide: API_URL,
            useValue: environment.baseUrl
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
