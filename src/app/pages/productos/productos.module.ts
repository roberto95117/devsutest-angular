import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { FormularioComponent } from './formulario/formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaProductosComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class ProductosModule { }
