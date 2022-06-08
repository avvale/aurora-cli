import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor()
    {
        /**/
    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // Clone the request object
        let newReq = req.clone();

        // Manage request
        newReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${'token'}`),
        });

        // Response
        return next.handle(newReq).pipe(
            catchError(error =>
            {
                // Catch "401 Unauthorized" responses
                if (error instanceof HttpErrorResponse && error.status === 401)
                {
                    // Manage errors
                }

                return throwError(() => error);
            }),
        );
    }
}
