import { BuilderModule } from '@builder.io/angular';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from './shared/services/breadcrumb.service';
import { BodyClassService } from './shared/services/body-class.service';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent
  ],
  imports: [
    NoopAnimationsModule,
    BrowserModule,
    HttpClientModule,
    BuilderModule.forRoot(environment.builderAPI),
    AppRoutingModule,
  ],
  providers: [
    BreadcrumbService,
    provideClientHydration(),
    BodyClassService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
