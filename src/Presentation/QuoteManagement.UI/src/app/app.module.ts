import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuotesListComponent } from './features/quotes/quotes-list/quotes-list.component';
import { QuoteFormComponent } from './features/quotes/quote-form/quote-form.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { SpeedDialModule } from 'primeng/speeddial';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    AppComponent,
    QuotesListComponent,
    QuoteFormComponent,
    ProfileComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MenubarModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    TabViewModule,
    SpeedDialModule,
    ProgressSpinnerModule,
    MessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }