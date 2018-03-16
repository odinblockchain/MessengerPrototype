// Imports
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Route Configuration
export const routes: Routes = [
  { path: '', redirectTo: '/messenger', pathMatch: 'full' }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
