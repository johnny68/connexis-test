import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    { path : '',          component: ListUserComponent },
    { path : 'add',       component: AddUserComponent },
    { path : 'edit',      component: AddUserComponent },
    { path : 'not-found', component: NotFoundComponent },
    { path : '**',        redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
