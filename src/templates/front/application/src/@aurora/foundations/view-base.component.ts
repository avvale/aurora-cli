import { Directive, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Action, ActionService, SessionService, SpinnerManagerService } from '@aurora';
import { BehaviorSubject, filter, Subject, takeUntil } from 'rxjs';

@Directive()
export class ViewBaseComponent implements OnInit, OnDestroy
{
    actionService: ActionService;                           // service to control application flow
    actionScope: string;                                    // name to identify the scope in which the actions manage, when we have dialogs that may contain colliding actions, defining this variable we isolate them.
    sessionService: SessionService;
    router: Router;                                         // instance current router object
    activatedRoute: ActivatedRoute;                         // instance current activated router object
    unsubscribeAll$: Subject<void> = new Subject();         // subject to destroy all subscriptions in ngOnDestroy life cycle

    // UI
    confirmationService: FuseConfirmationService;           // confirmation service to show dialogs
    snackBar: MatSnackBar;                                  // snack bar common to all components
    spinnerManagerService: SpinnerManagerService;           // service to control spinner
    translocoService: TranslocoService;                     // translation service

    currentViewAction: Action;
    currentAction: Action;

    constructor(
        protected injector: Injector,
    )
    {
        this.actionService          = this.injector.get(ActionService);
        this.sessionService         = this.injector.get(SessionService);
        this.router                 = this.injector.get(Router);
        this.activatedRoute         = this.injector.get(ActivatedRoute);

        // UI
        this.confirmationService    = this.injector.get(FuseConfirmationService);
        this.snackBar               = this.injector.get(MatSnackBar);
        this.spinnerManagerService  = this.injector.get(SpinnerManagerService);
        this.translocoService       = this.injector.get(TranslocoService);
    }

    ngOnInit(): void
    {
        this.actionService
            .action$
            .pipe(
                takeUntil(this.unsubscribeAll$),
                filter(action => !this.actionScope || (this.actionScope && action.id.startsWith(this.actionScope))),
            )
            .subscribe(async action =>
            {
                // if the spinner of the action is defined, it means that there is a specific key
                // to obtain the BehaviorSubject that controls the spinner of the action
                const spinnerFlag$ = action.spinner instanceof Function ?
                    action.spinner() :
                    action.spinner instanceof BehaviorSubject ?
                        action.spinner :
                        this.spinnerManagerService.getSpinnerFlag(action.id);

                // show spinner
                spinnerFlag$.next(true);

                // set current view action to modify/change the view
                // for example, when click edit from list view to go to edit view
                if (action?.isViewAction) this.currentViewAction = action;

                // set current action to modify the view
                this.currentAction = action;

                if (action?.beforeRunAction instanceof Function) action.beforeRunAction(action);
                await this.handleAction(action);
                if (action?.afterRunAction instanceof Function)  action.afterRunAction(action);

                // hide spinner
                spinnerFlag$.next(false);
            });

        // init logic of component after set input
        this.init();
    }

    ngOnDestroy(): void
    {
        this.unsubscribeAll$.next();
        this.unsubscribeAll$.complete();
    }

    // method to be overwrite by nested class
    async handleAction(action: Action): Promise<void> { /**/ }

    // method to be overwrite by nested class
    init(): void { /**/ }
}
