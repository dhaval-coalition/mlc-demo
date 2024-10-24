//framework component/module import statement
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//custom module/component import statement
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
