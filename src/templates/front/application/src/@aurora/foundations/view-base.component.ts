import { Directive, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SessionService } from '@aurora/modules/session/session.service';
import { ActionService } from '@aurora/services/action.service';
import { Subject } from 'rxjs';

@Directive()
export class ViewBaseComponent implements OnDestroy
{
    actionService: ActionService;                           // service to control application flow
    sessionService: SessionService;
    router: Router;                                         // instance current router object
    activatedRoute: ActivatedRoute;                         // instance current activated router object
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
        this.activatedRoute         = this.injector.get(ActivatedRoute);

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
