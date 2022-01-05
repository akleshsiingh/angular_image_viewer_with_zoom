import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageZoomDirectiveDirective } from './product-details/image-zoom-directive.directive';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductZoomComponent } from './product-details/product-zoom/product-zoom.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    ProductZoomComponent,
    ImageZoomDirectiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
