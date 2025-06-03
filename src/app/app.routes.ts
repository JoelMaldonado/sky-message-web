import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SendMessagesComponent } from './pages/send-messages/send-messages.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'send-messages',
    component: SendMessagesComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
