import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { addDays, addYears, format } from 'date-fns';
import { catchError, of } from 'rxjs';
import { ProductoFinancieroService } from 'src/app/_services/producto-financiero.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit{


  formularioProducto: UntypedFormGroup;
  id: string | null = null;

  private productoFinancieroSrv = inject(ProductoFinancieroService);
  private fb = inject(UntypedFormBuilder);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.inicializaFormulario();
    this.verificaParametro();
  }

  inicializaFormulario(){
    this.formularioProducto = this.fb.group({
      id: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: [null, Validators.required],
      date_release: [null, Validators.required],
      date_revision:[null, Validators.required]
    });

    this.formularioProducto.controls['date_release'].valueChanges
    .subscribe(val => {
      this.formularioProducto.get('date_revision').setValue(format(( addDays(addYears(new Date(val),1),1) ), 'yyyy-MM-dd'));
    });
  }

  verificaParametro(){
    this.route.params
    .subscribe(params => {
      if(params){
        this.id = params['id'] ? params['id'] : null;
        if(this.id){
          this.cargaCampos();
        }
      }

    });
  }

  limpiar(){
    this.formularioProducto.reset();
    this.id = null;
  }

  agregar(){
    if(this.id){
      this.productoFinancieroSrv.modificarProducto(this.formularioProducto.value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.status === HttpStatusCode.BadRequest){
            alert('Falta el id de autoridad');
            return of('error')
          }
          if(error.status === HttpStatusCode.PartialContent){
            alert('Faltan campos');
            return of('error')
          }
        })
      )
      .subscribe(res => {
        if(res.id){
          alert('Registro modificado');
        }else{
          alert('Error al modificar registro');
        }
      });
    }else{
      this.productoFinancieroSrv.agregarProducto(this.formularioProducto.value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.status === HttpStatusCode.BadRequest){
            alert('Falta el id de autoridad');
            return of('error')
          }
          if(error.status === HttpStatusCode.PartialContent){
            alert('Faltan campos');
            return of('error')
          }
          if(error.status === HttpStatusCode.Unauthorized){
            alert('Sin permisos para agregar');
            return of('error')
          }
        })
      )
      .subscribe((res:any) => {
        if(res.id){
          alert('Registro agregado');
        }else{
          alert('Error al agregar registro');
        }
      });
    }
  }

  validaExistente(){
    if(this.id) return;
    this.productoFinancieroSrv.verificarExistencia(this.formularioProducto.value.id)
    .subscribe(resSear => {
      if(resSear){
        this.formularioProducto.controls['id'].setErrors({ existente: true});
      }
    });
  }

  cargaCampos(){
    this.productoFinancieroSrv.buscarPorId(this.id)
    .subscribe(resId => {
      let obj = resId.find(item => item.id == this.id);
      this.formularioProducto.patchValue(obj);
      this.formularioProducto.get('date_revision').setValue(format(new Date(obj.date_revision), 'yyyy-MM-dd'));
      this.formularioProducto.get('date_release').setValue(format(new Date(obj.date_release), 'yyyy-MM-dd'));
    });
  }


}
