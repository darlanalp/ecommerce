import { mockProducts } from './../../mocks/product.mock';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductSearchService } from './product-search.service';
import { Product } from '../../models/product.model';

describe('ProductSearchService', () => {
  let service: ProductSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ProductSearchService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  it('should retorna o models corretamente', () => {

    //Arrange
    const mockName = 'notebook';
    const url = `${service.apiUrl}/products?name=${mockName}`;
    let result: Product[] = [];

    //Action
    service.searchByName(mockName).subscribe((products) => (result = products));

    //Assert
    const request = httpMock.expectOne(url);//Garante que a Url executada pelo service é a mesma do teste 
    request.flush(mockProducts); //retorna o body do http mockado 
    expect(request.request.method).toBe('GET'); //testa se o tipo da requisição ta ok
    expect(result).toEqual(mockProducts);
  });


  it('should retorna o models corretamente por id do produto', () => {

    //Arrange
    const mockId = '123';
    const url = `${service.apiUrl}/products/${mockId}`;
    let result!: Product;

    //Action
    service.getById(mockId).subscribe((product) => (result = product));

    //Assert
    const request = httpMock.expectOne(url);//Garante que a Url executada pelo service é a mesma do teste 
    request.flush(mockProducts[0]); //retorna o body do http mockado 
    expect(request.request.method).toBe('GET'); //testa se o tipo da requisição ta ok
    expect(result).toEqual(mockProducts[0]);
  });
});
