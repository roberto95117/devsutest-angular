import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MountConfig } from 'cypress/angular';
import { ProductoFinancieroService } from 'src/app/_services/producto-financiero.service';
import { FormularioComponent } from './formulario.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppInterceptor } from 'src/app/_util/app-interceptor';
import { RouterTestingModule } from '@angular/router/testing';

describe('FormularioComponent', () => {
  const config: MountConfig<FormularioComponent> = {
    imports: [HttpClientModule, ReactiveFormsModule, FormsModule],
    providers: [ProductoFinancieroService,
      RouterTestingModule,
      {provide: ActivatedRoute, useValue: null},
      AppInterceptor,
      { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
    ]
  }
  it('can mount', () => {
      cy.mount(FormularioComponent, config)
  })
});
