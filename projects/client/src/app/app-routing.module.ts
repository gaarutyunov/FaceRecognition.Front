import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        data: {
            breadcrumb: 'Authorization'
        },
        children: [
            {
                path: '',
                redirectTo: 'register',
                pathMatch: 'full'
            },
            {
                path: 'register',
                component: RegisterComponent,
                data: {
                    breadcrumb: 'Registration'
                }
            },
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    breadcrumb: 'Login'
                }
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
