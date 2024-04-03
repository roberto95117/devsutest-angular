import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MountConfig } from 'cypress/angular';
import { ListaProductosComponent } from './lista-productos.component';
import { ProductoFinancieroService } from 'src/app/_services/producto-financiero.service';
import { AppInterceptor } from 'src/app/_util/app-interceptor';
import { MatIconModule } from '@angular/material/icon';

describe('ListaProductosComponent', () => {
  const config: MountConfig<ListaProductosComponent> = {
    imports: [HttpClientModule, MatIconModule],
    providers: [ProductoFinancieroService,
      AppInterceptor,
      { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },]
  }
  it('can mount', () => {
      cy.mount(ListaProductosComponent, config)
  })
});
