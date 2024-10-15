import { NgModule } from '@angular/core';  // Certifique-se de importar isso
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule, 
  ],
  providers: [],

})
export class AppModule { }
