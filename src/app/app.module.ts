import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function jwtOptionsFactory() {
  return {
    whitelistedDomains: ['localhost'],
    blacklistedRoutes: [],
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
