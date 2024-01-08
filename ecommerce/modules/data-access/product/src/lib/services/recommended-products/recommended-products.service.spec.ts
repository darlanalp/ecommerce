import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecommendedProductsService } from './recommended-products.service';
import { Product } from '../../models/product.model';
import { mockProducts } from '../../mocks/product.mock';

//Aula do dia 27/11/2023
describe('RecommendedProductsService', () => {
  let service: RecommendedProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(RecommendedProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should produtos recomendados', () => {

    //Arrange
    const url = `${service.apiUrl}/products?page=1&limit=6`;
    let result: Product[] = [];

    //Action
    service.getProducts().subscribe((products) => (result = products));

    //Assert
    const request = httpMock.expectOne(url);//Garante que a Url executada pelo service é a mesma do teste 
    request.flush(mockProducts); //retorna o body do http mockado 
    expect(request.request.method).toBe('GET'); //testa se o tipo da requisição ta ok
    expect(result).toEqual(mockProducts);
  });
});
