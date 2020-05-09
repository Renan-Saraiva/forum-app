import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CommentComponent } from './components/comment/comment.component';
import { ConfigService } from './services/config.service';
import { TalkerComponent } from './components/talker/talker.component';
import { FormsModule } from '@angular/forms';
import { CommentViewComponent } from './pages/comment-view/comment-view.component';
import { LoadingComponent } from './components/loading/loading.component';

const appConfig = (configService: ConfigService) => {
  return () => {
    return configService.loadConfigJSON();
  }
}

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
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
