import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: '', title: 'Login',
    component: LoginComponent
  },
  {
    path: 'register', title: 'Register',
    component: RegisterComponent
  },
  {
    path: 'activate-account', title: 'Activate-account',
    component: ActivateAccountComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule)
  }


  ,{
  path: '**', title: '404',
    component: PageNotFoundComponent
  }
];
