import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from '../layout/home/home.component';
import { CourseComponent } from '../layout/course/course.component';
import { BlogComponent } from '../layout/blog/blog.component';
import { ContactUsComponent } from '../layout/contact-us/contact-us.component';

const appRoutes : Routes = [
    { path : '', redirectTo:'/home', pathMatch:'full'},
    { path : 'home',component : HomeComponent},
    { path : 'courses',component : CourseComponent},
    { path : 'blog',component : BlogComponent},
    { path : 'contact-us',component : ContactUsComponent}
]

@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}   