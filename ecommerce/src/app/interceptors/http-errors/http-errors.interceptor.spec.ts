import { TestBed } from '@angular/core/testing';

import { HttpErrorsInterceptor } from './http-errors.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

//Aula dia 03-01-2024
describe('HttpErrorsInterceptor', () => {

  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let matSnackBar: MatSnackBar;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        HttpErrorsInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorsInterceptor,
          multi: true,
        },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    matSnackBar = TestBed.inject(MatSnackBar);
  });


  it('should open notification on http error', () => {

    //Espionar o metodo open do matSnackBar para utilizar mais abaixo
    jest.spyOn(matSnackBar, 'open');

    //Simula a chamada http qualquer
    httpClient.get('/test').subscribe(); //.subscribe(); chama a requisição

    const request = httpMock.expectOne('/test');
    //simula que a requisição deu um erro
    request.error(new ProgressEvent('error'));

    //Espera que o metodo open foi chamado em função do erro da requisição
    expect(matSnackBar.open).toHaveBeenCalled();
    //Testa se dentro do header da requisição tem o x-access-token
    expect(request.request.headers.has('x-access-token')).toBe(true);
  });

});
