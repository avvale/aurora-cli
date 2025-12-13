import { Directive, OnDestroy, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Router } from '@angular/router';
import {
    Action,
    ActionService,
    ActionStatusManagerService,
    SessionService,
    log,
} from '@aurora';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoService } from '@jsverse/transloco';
import { BehaviorSubject, Subject, filter, takeUntil } from 'rxjs';

@Directive()
export class ViewBaseComponent implements OnInit, OnDestroy {
    actionService: ActionService; // service to control application flow
    actionScope: string; // name to identify the scope in which the actions manage, when we have dialogs that may contain colliding actions, defining this variable we isolate them.
    sessionService: SessionService;
    router: Router; // instance current router object
    activatedRoute: ActivatedRoute; // instance current activated router object
    routeData: Data; // data of the current route
    unsubscribeAll$: Subject<void> = new Subject(); // subject to destroy all subscriptions in ngOnDestroy life cycle

    // UI
    confirmationService: FuseConfirmationService; // confirmation service to show dialogs
    snackBar: MatSnackBar; // snack bar common to all components
    actionStatusManagerService: ActionStatusManagerService; // service to control if action is running or not
    translocoService: TranslocoService; // translation service

    currentViewAction: Action;
    currentAction: Action;

    constructor() {
        this.actionService = inject(ActionService);
        this.sessionService = inject(SessionService);
        this.router = inject(Router);
        this.activatedRoute = inject(ActivatedRoute);
        this.routeData = this.activatedRoute.snapshot.data.data;

        // UI
        this.confirmationService = inject(FuseConfirmationService);
        this.snackBar = inject(MatSnackBar);
        this.actionStatusManagerService = inject(ActionStatusManagerService);
        this.translocoService = inject(TranslocoService);
    }

    ngOnInit(): void {
        this.actionService.action$
            .pipe(
                takeUntil(this.unsubscribeAll$),
                filter(
                    (action) =>
                        !this.actionScope ||
                        (this.actionScope &&
                            action?.id.startsWith(this.actionScope)),
                ),
            )
            .subscribe(async (action) => {
                if (!action) {
                    log('[DEBUG] Action not defined.');
                    return;
                }

                // if the spinner of the action is defined, it means that there is a specific key
                // to obtain the BehaviorSubject that controls the spinner of the action
                const actionStatus$ =
                    action.spinner instanceof Function
                        ? action.spinner()
                        : action.spinner instanceof BehaviorSubject
                          ? action.spinner
                          : this.actionStatusManagerService.getActionStatus(
                                action.id,
                            );

                // show spinner
                actionStatus$.next(true);

                // set current view action to modify/change the view
                // for example, when click edit from list view to go to edit view
                if (action?.isViewAction) this.currentViewAction = action;

                // set current action to modify the view
                this.currentAction = action;

                if (action?.beforeRunAction instanceof Function)
                    action.beforeRunAction(action);
                await this.handleAction(action);
                if (action?.afterRunAction instanceof Function)
                    action.afterRunAction(action);

                // hide spinner
                actionStatus$.next(false);
            });

        // init logic of component after set input
        this.init();
    }

    ngOnDestroy(): void {
        this.unsubscribeAll$.next();
        this.unsubscribeAll$.complete();
    }

    // method to be overwrite by nested class
    async handleAction(action: Action): Promise<void> {
        /**/
    }

    // method to be overwrite by nested class
    init(): void {
        /**/
    }
}
