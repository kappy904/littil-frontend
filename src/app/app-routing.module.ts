import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatorResolver } from './services/authentication.resolver';
import { NotFoundComponent } from './pages/website/not-found/not-found.component';
import { CompleteProfileGuardService } from './services/complete-profile-guard.service';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [CompleteProfileGuardService],
    resolve: {
      auth: AuthenticatorResolver,
    },
  },
  {
    path: 'complete-profile',
    loadChildren: () =>
      import('./pages/complete-profile/complete-profile.module').then(
        (m) => m.CompleteProfilePageModule
      ),
    canActivate: [CompleteProfileGuardService],
    resolve: {
      auth: AuthenticatorResolver,
    },
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/website/website.module').then((m) => m.WebsiteModule),
    resolve: {
      auth: AuthenticatorResolver,
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [CompleteProfileGuardService],
    resolve: {
      auth: AuthenticatorResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
