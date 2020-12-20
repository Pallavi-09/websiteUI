import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { CourseComponent } from './layout/course/course.component';
import { HeaderComponent } from './layout/header/header.component';
import { BlogComponent } from './layout/blog/blog.component';
import { ContactUsComponent } from './layout/contact-us/contact-us.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { FooterComponent } from './layout/footer/footer.component';
import { ParticlesComponent } from './layout/particles/particles.component';
import { ParticlesDirective } from './layout/particles/particles.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CourseComponent,
    HeaderComponent,
    BlogComponent,
    ContactUsComponent,
    FooterComponent,
    ParticlesComponent,
    ParticlesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }