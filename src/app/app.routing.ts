import { Routes, RouterModule } from '@angular/router';
import { APIComponent } from './api/api.component';

const APP_ROUTES: Routes = [
    { path:'', redirectTo: 'api', pathMatch:'full' },
    { path:'api', component: APIComponent },
    { path: '*', redirectTo: 'start' }
]

export const routing = RouterModule.forRoot(APP_ROUTES);