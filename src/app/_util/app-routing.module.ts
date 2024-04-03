import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoEcontradoComponent } from '../pages/no-econtrado/no-econtrado.component';

const routes: Routes = [
  {
    path: '',
    'redirectTo': '/productos' ,
    pathMatch: 'full'
  },
  { path: 'productos',
    loadChildren: () => import('src/app/pages/productos/productos.module').then(m => m.ProductosModule),
    title: `Productos`
  },
  {
    path: '**',
    loadComponent: () => import('src/app/pages/no-econtrado/no-econtrado.component').then(c => c.NoEcontradoComponent),
    title: `No encontrado`
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
