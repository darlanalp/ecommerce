import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

  constructor(private matSnackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const clonedRequest = request.clone({
      setHeaders: {
        'x-access-token': 'MEU_TOKEN',
      },
    });

    return next.handle(clonedRequest).pipe(
      catchError((error) => {
        this.matSnackBar.open('Ops, houve um erro', 'Fechar', { duration: 3000 })
        // EXECUTA ALGUMA AÇÃO
        return throwError(() => error); // PASSA O ERRO PRA FRENTE
      })
    );
  }
}
