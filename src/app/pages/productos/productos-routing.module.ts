import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { FormularioComponent } from './formulario/formulario.component';

const routes: Routes = [
  {
    path: '',
    component: ListaProductosComponent
  },
  {
    path: 'formulario',
    component: FormularioComponent
  },
  {
    path: 'formulario/:id',
    component: FormularioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
