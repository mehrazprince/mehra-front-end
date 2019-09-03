import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ChatService } from './service/chat.service';
import { LoginService } from './service/login.service';
import { UserService } from './service/user.service';
import { ChatInterfaceComponent } from './chat-interface/chat-interface.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserComponent } from './user/user.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CreateUserComponent } from './user/create-user/create-user.component';

const config: SocketIoConfig = { url: 'http://localhost:4000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ChatInterfaceComponent,
    LoginComponent,
    PageNotFoundComponent,
    UserComponent,
    NavBarComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    UserService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
