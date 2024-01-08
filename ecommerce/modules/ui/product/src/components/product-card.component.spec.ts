import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { mockProducts } from 'product-data-access';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = mockProducts[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Valida se o card esta sendo renderizado corretamente', () => {

    const card: HTMLElement = fixture.nativeElement.querySelector('mat-card');
    expect(card.textContent).toContain(component.product.name);
    expect(card.textContent).toContain(component.product.price.toString());
  });

});
