import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter, finalize, Observable, tap } from 'rxjs';
import { FuseLoadingService } from '@fuse/services/loading/loading.service';

@Injectable()
export class FuseLoadingInterceptor implements HttpInterceptor
{
    handleRequestsAutomatically: boolean;

    /**
     * Constructor
     */
    constructor(
        private _fuseLoadingService: FuseLoadingService
    )
    {
        // Subscribe to the auto
        this._fuseLoadingService.auto$
            .subscribe((value) => {
                this.handleRequestsAutomatically = value;
            });
    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // If the Auto mode is turned off, do nothing
        if ( !this.handleRequestsAutomatically )
        {
            return next.handle(req);
        }

        // @aurora
        return next
            .handle(req)
            .pipe(
                // only manage HttpResponse events and avoid HttpEventType.Sent, that is the confirmation when the request is sent.
                // This event causes events to be triggered too quickly in the same execution cycle, causing the error:
                // NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
                // Previous value: 'false'. Current value: 'true'. Find more at https://angular.io/errors/NG0100
                // This error occurs when opening a collapsable menu and trying to retrieve a library of material icons,
                // and makes a request http://localhost:4200/assets/icons/material-outline.svg
                filter((event: HttpEvent<any>) => event instanceof HttpResponse),
                tap((event: HttpEvent<any>) =>
                {
                    // Set the loading status to true
                    this._fuseLoadingService._setLoadingStatus(true, req.url);
                }),
                finalize(() =>
                {
                    // Set the status to false if there are any errors or the request is completed
                    this._fuseLoadingService._setLoadingStatus(false, req.url);
                }),
            );
    }
}
