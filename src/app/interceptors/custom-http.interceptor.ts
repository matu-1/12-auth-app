import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { catchError } from 'rxjs/operators';
import { ErrorResponse } from '../utils/ErrorResponse';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${AuthService.getToken()}`,
      },
    });
    return next.handle(req).pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof ProgressEvent) {
      return throwError(
        new ErrorResponse(500, 'Ups ocurrio un error en el servidor', 'error')
      );
    }
    return throwError(
      new ErrorResponse(err.error.statusCode, err.error.message)
    );
  }
}
