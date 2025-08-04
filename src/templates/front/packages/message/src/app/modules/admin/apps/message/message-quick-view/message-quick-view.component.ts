import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DatePipe, NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, WritableSignal, computed, inject, signal } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { MessageInbox, MessageService } from '@apps/message';
import { GridData } from '@aurora';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@jsverse/transloco';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';
import { InboxService } from '../inbox';

export const messageQuickViewMessagesScope = 'message::QuickViewMessages';

@Component({
    selector: 'au-message-quick-view',
    templateUrl: './message-quick-view.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'messageQuickView',
    imports: [
        MatButtonModule, MatIconModule, MatTooltipModule,
        NgClass, NgTemplateOutlet, RouterLink, TranslocoModule, DatePipe,
    ],
    providers: [
        {
            provide : TRANSLOCO_SCOPE,
            useValue: 'message',
            multi   : true,
        },
    ],
})
export class MessageQuickViewComponent implements OnInit, OnDestroy
{
    @ViewChild('messagesOrigin') private messagesOrigin: MatButton;
    @ViewChild('messagesPanel') private messagesPanel: TemplateRef<any>;

    messages: WritableSignal<MessageInbox[]> = signal([]);
    unreadMessagesNumber: WritableSignal<number>;
    inboxCustomerPagination: GridData<MessageInbox>;
    unreadCount: number = 0;

    private inboxService = inject(InboxService);
    private messageService = inject(MessageService);
    private router = inject(Router);
    private unsubscribeAll$: Subject<void> = new Subject<void>();
    private overlayRef: OverlayRef;

    /**
     * Constructor
     */
    constructor(
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef,
    )
    { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    async ngOnInit(): Promise<void>
    {
        this.unreadMessagesNumber = this.messageService.unreadMessagesNumber;

        // Get the messages
        await this.getMessages();
        await this.messageService.countUnreadMessages();

        // Subscribe to message changes
        this.inboxService
            .getScopePagination(messageQuickViewMessagesScope)
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((inboxCustomerPagination: GridData<MessageInbox>) =>
            {
                // Load the messages
                this.messages.set(inboxCustomerPagination.rows);
            });

        // Subscribe to toggle message as read
        this.messageService
            .toggleMessageAsRead$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(async (toggleMessage: MessageInbox) =>
            {
                // mark message as read/unread if it is in the list
                const messages = this.messages();
                this.messages.set(
                    messages.map(message =>
                    {
                        if (message.id === toggleMessage.id) message.isRead = !message.isRead;
                        return message;
                    }),
                );

                // update unread total messages count
                await this.messageService.countUnreadMessages();
            });

        // Subscribe to message as deleted
        this.messageService
            .deletedMessage$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(async (deletedMessage: MessageInbox) =>
            {
                // only update the messages if the deleted message is in the list
                if (this.messages().some(message => message.id === deletedMessage.id))
                {
                    this.getMessages();
                }

                // count unread messages if deleted message is unread
                if (!deletedMessage.isRead)
                {
                    this.messageService.countUnreadMessages();
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll$.next(null);
        this.unsubscribeAll$.complete();

        // Dispose the overlay
        if (this.overlayRef)
        {
            this.overlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    async getMessages(): Promise<GridData<MessageInbox>>
    {
        // Get the messages
        return await lastValueFrom(
            this.inboxService
                .paginateCustomerQuickVewMessagesInbox({
                    query: {
                        limit : 10,
                        offset: 0,
                        order : [['sort', 'desc']],
                    },
                }),
        );
    }

    /**
     * Open the messages panel
     */
    openPanel(): void
    {
        // Return if the messages panel or its origin is not defined
        if (!this.messagesPanel || !this.messagesOrigin)
        {
            return;
        }

        // Create the overlay if it doesn't exist
        if (!this.overlayRef)
        {
            this.createOverlay();
        }

        // Attach the portal to the overlay
        this.overlayRef.attach(new TemplatePortal(this.messagesPanel, this.viewContainerRef));
    }

    /**
     * Close the messages panel
     */
    closePanel(): void
    {
        this.overlayRef.detach();
    }

    /**
     * Mark all messages as read
     */
    goToMessageCenter(): void
    {
        this.router.navigate(['message', 'message-center']);
    }

    /**
     * Delete the given message
     */
    deleteMessage(message: MessageInbox): void
    {
        this.messageService.deleteMessage(message);
        this.messageService.countUnreadMessages();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the overlay
     */
    private createOverlay(): void
    {
        // Create the overlay
        this.overlayRef = this.overlay.create({
            hasBackdrop     : true,
            backdropClass   : 'fuse-backdrop-on-mobile',
            scrollStrategy  : this.overlay.scrollStrategies.block(),
            positionStrategy: this.overlay.position()
                .flexibleConnectedTo(this.messagesOrigin._elementRef.nativeElement)
                .withLockedPosition(true)
                .withPush(true)
                .withPositions([
                    {
                        originX : 'start',
                        originY : 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                    },
                    {
                        originX : 'start',
                        originY : 'top',
                        overlayX: 'start',
                        overlayY: 'bottom',
                    },
                    {
                        originX : 'end',
                        originY : 'bottom',
                        overlayX: 'end',
                        overlayY: 'top',
                    },
                    {
                        originX : 'end',
                        originY : 'top',
                        overlayX: 'end',
                        overlayY: 'bottom',
                    },
                ]),
        });

        // Detach the overlay from the portal on backdrop click
        this.overlayRef.backdropClick().subscribe(() =>
        {
            this.overlayRef.detach();
        });
    }
}
