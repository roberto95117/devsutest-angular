import { MountConfig } from 'cypress/angular';
import { NoEcontradoComponent } from './no-econtrado.component';

describe('NoEncontradoComponent', () => {
  const config: MountConfig<NoEcontradoComponent> = {

  }
  it('can mount', () => {
      cy.mount(NoEcontradoComponent, config);
  })
});
