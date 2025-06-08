import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotesListComponent } from './features/quotes/quotes-list/quotes-list.component';
import { QuoteFormComponent } from './features/quotes/quote-form/quote-form.component';
import { ProfileComponent } from './features/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/quotes', pathMatch: 'full' },
  { path: 'quotes', component: QuotesListComponent },
  { path: 'quotes/new', component: QuoteFormComponent },
  { path: 'quotes/edit/:id', component: QuoteFormComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
