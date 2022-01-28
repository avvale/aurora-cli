import { Directive, Injector, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ActionService, SessionService } from '@aurora';
import { Subject } from 'rxjs';

@Directive()
export class ViewBaseComponent implements OnDestroy
{
    actionService: ActionService;                           // service to control application flow
    sessionService: SessionService;
    router: Router;                                         // instance current router object
    unsubscribeAll$: Subject<void> = new Subject();         // subject to destroy all subscriptions in ngOnDestroy life cycle

    // UI
    snackBar: MatSnackBar;                                  // snack bar common to all components
    confirmationService: FuseConfirmationService;           // confirmation service to show dialogs
    translocoService: TranslocoService;                     // translation service
    currentActionId: string;                                // store current action id

    constructor(
        protected injector: Injector,
    )
    {
        this.actionService          = this.injector.get(ActionService);
        this.sessionService         = this.injector.get(SessionService);
        this.router                 = this.injector.get(Router);

        // UI
        this.snackBar               = this.injector.get(MatSnackBar);
        this.confirmationService    = this.injector.get(FuseConfirmationService);
        this.translocoService       = this.injector.get(TranslocoService);
    }

    ngOnDestroy(): void
    {
        this.unsubscribeAll$.next();
        this.unsubscribeAll$.complete();
    }
}
