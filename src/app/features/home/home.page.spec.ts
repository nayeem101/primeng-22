import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { EXAMPLE_CATALOG } from './example-catalog';
import { HomePage } from './home.page';

describe('HomePage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should render the example catalog cards', async () => {
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();

    const cards = fixture.nativeElement.querySelectorAll('[data-testid^="example-card-"]');
    expect(cards.length).toBe(EXAMPLE_CATALOG.length);
    expect(fixture.nativeElement.querySelector('[data-testid="example-card-signal-forms"]')).toBeTruthy();
  });

  it('should expose the ready Signal Forms example with its route', async () => {
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();

    const example = EXAMPLE_CATALOG.find((item) => item.id === 'signal-forms');
    expect(example?.status).toBe('ready');
    expect(example?.route).toBe('/examples/signal-forms');
    expect(fixture.nativeElement.querySelector('[data-testid="open-signal-forms"]')).toBeTruthy();
  });
});
