import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductSearchComponent } from './product-search.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductSearchService, mockProducts } from 'product-data-access';
import { of } from 'rxjs';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;
  let productSearchService: ProductSearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSearchComponent, NoopAnimationsModule],
      //Criando mocks
      providers: [
        {
          provide: ProductSearchService, //Quando o componente olhar o servies e chamar o searchByName ele retorna o mock
          //abaixo estamos fazendo um mock da function searchByName do ProductSearchService.
          //A função of é a forma mais fácil de criar um Observable a partir de um valor.
          useValue: { searchByName: () => of(mockProducts) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productSearchService = TestBed.inject(ProductSearchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  //deve debounce quando o campo de entrada é alterado
  it('should debounce when input field is changed', fakeAsync(
    () => {
      jest.spyOn(productSearchService, 'searchByName');
      const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
      input.value = 'tv';
      input.dispatchEvent(new Event('input')); //Envia o evento -->> input indica que vc esta digitando o valor tv

      //## Entendendo o Pattern Spy
      //**Mock**: Quando precisamos lidar com o input
      //**Spy**: Quando precisamos lidar com o input e output

      //Indica que o metodo searchByName ainda não foi chamado
      expect(productSearchService.searchByName).not.toHaveBeenCalled();
      tick(500); //da uma espera de 500 milesegundos 
      //Indica que o metodo searchByName ainda foi chamado e valida se foi com o mesmo valor inputado "tv"
      expect(productSearchService.searchByName).toHaveBeenCalledWith(input.value);
    }
  )
  )

  //deveria pesquisar várias vezes
  it('should search multiple times', fakeAsync(
    () => {
      jest.spyOn(productSearchService, 'searchByName');

      const input: HTMLInputElement =
        fixture.nativeElement.querySelector('input');
      input.value = 'tv';
      input.dispatchEvent(new Event('input'));
      tick(500);

      input.value = 'notebook';
      input.dispatchEvent(new Event('input'));
      tick(500);

      expect(productSearchService.searchByName).toHaveBeenCalledTimes(2);
    }
  )
  )

  //deve evitar envios idênticos
  it('should prevent identical submissions', fakeAsync(() => {
    jest.spyOn(productSearchService, 'searchByName');

    //Faz a chamada duas vezes passando o mesmo valor, neste caso tem que fazer apenas uma chamada no servidor
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    input.value = 'tv';
    input.dispatchEvent(new Event('input'));
    tick(500);

    input.value = 'tv';
    input.dispatchEvent(new Event('input'));
    tick(500);

    expect(productSearchService.searchByName).toHaveBeenCalledTimes(1);
  }));

  //deve evitar envios vazios
  it('should prevent empty submissions', fakeAsync(() => {
    jest.spyOn(productSearchService, 'searchByName');
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    //Envia um valor vazio 
    input.value = '';
    input.dispatchEvent(new Event('input'));
    tick(500);
    //Testa se não fez nenhuma chamada
    expect(productSearchService.searchByName).not.toHaveBeenCalled();
  }));

  //deve retornar produtos observable ​​corretamente
  it('should return products observable correctly', () => {
    component.products$.subscribe((result) => {
      expect(result).toEqual(mockProducts);
    });
  });

});
