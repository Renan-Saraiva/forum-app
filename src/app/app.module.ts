import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CommentComponent } from './components/comment/comment.component';
import { ConfigService } from './services/config.service';
import { TalkerComponent } from './components/talker/talker.component';
import { CommentViewComponent } from './pages/comment-view/comment-view.component';
import { LoadingComponent } from './components/loading/loading.component';

const appConfig = (configService: ConfigService) => {
  return () => {
    return configService.loadConfigJSON();
  }
}

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    CommentComponent,
    TalkerComponent,
    CommentViewComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ConfigService, {
      provide: APP_INITIALIZER,
      useFactory: appConfig,
      multi: true,
      deps: [ConfigService]
    },
    { provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
