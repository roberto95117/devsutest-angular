import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { ProductoFinanciero } from 'src/app/_model/producto-financiero.model';
import { ProductoFinancieroService } from 'src/app/_services/producto-financiero.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit{

  productos: ProductoFinanciero[] = [];
  pag: number | null = 5;
  seleccionado: ProductoFinanciero | null = null;
  filtro: UntypedFormControl;
  productosFiltrados: Observable<ProductoFinanciero[]>;

  private productoFinancieroSrv = inject(ProductoFinancieroService);
  private router = inject(Router);

  constructor(){
    this.filtro = new FormControl('');
  }

  _filtro(val: any) {
    let filter = [];
    let count = 0;
    this.productos.forEach(item => {
      if((item.name.toLowerCase().includes(val.toLowerCase()) ) && count <= this.pag -1){
        filter.push(item);
        count = count + 1;
      }
    });
    return filter;
  }

  ngOnInit(): void {
    this.llenarTabla();
  }

  llenarTabla(){
    this.productoFinancieroSrv.obtenerProductos()
    .subscribe( data => {
      this.productos = data;
      this.productosFiltrados = this.filtro.valueChanges
      .pipe(
        startWith(''),
        map(val => val ? this._filtro(val) : this.todos())
      );
    });
  }

  todos(){
    let prod = this.productos.slice();
    let filter = [];
    let count = 0;
    prod.forEach(item => {
      if( count <= this.pag -1){
        filter.push(item);
        count = count + 1;
      }
    });
    return filter;
  }

  navegar(){
    this.router.navigate(['productos/formulario']);
  }

  dialogoEliminar(obj: ProductoFinanciero){
    document.getElementById('confirma').style.display='block';
    this.seleccionado = obj;
  }

  eliminar(){
    document.getElementById('confirma').style.display='none';
    this.productoFinancieroSrv.eliminarProducto(this.seleccionado.id)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.NotFound){
          alert('no existe registro');
          return of('error')
        }
        if(error.status === HttpStatusCode.BadRequest){
          alert('Falta el id de autoridad');
          return of('error')
        }
        return of('ok');
      })
    )
    .subscribe(res => {
      if(res == 'ok'){
        alert('Registro eliminado');
        this.seleccionado = null;
        this.llenarTabla();
      }
    });
  }

  cambiaPag(val){
    this.pag = val.target.value;
    this.filtro.setValue('');
  }
}
