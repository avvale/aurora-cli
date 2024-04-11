import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf, NgPlural, NgPluralCase } from '@angular/common';
import { Component, ViewEncapsulation, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { InboxService } from '@apps/message/inbox';
import { MessageInbox } from '@apps/message/message.types';
import { FuseScrollResetDirective } from '@fuse/directives/scroll-reset';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { lastValueFrom, takeUntil } from 'rxjs';
import { MessageCenterService } from '../message-center.service';
import { messageCustomerCenterMessage } from '../list/message-center-list.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Action, DownloadService, ViewBaseComponent } from '@aurora';

@Component({
    selector     : 'message-center-details',
    templateUrl  : './message-center-details.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [
        NgIf, MatButtonModule, RouterLink, MatIconModule, MatMenuModule, NgFor, MatRippleModule,
        MatCheckboxModule, MatTooltipModule, NgClass, FuseScrollResetDirective, NgPlural, NgPluralCase,
        MatFormFieldModule, MatInputModule, FuseFindByKeyPipe, DecimalPipe, DatePipe, TranslocoModule,
    ],
})
export class MessageCenterDetailsComponent extends ViewBaseComponent
{
    message: WritableSignal<MessageInbox> = signal(null);
    inboxService = inject(InboxService);
    messageCenterService = inject(MessageCenterService);
    downloadService = inject(DownloadService);

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        // we don't initialize the subscriptions in the handleAction because
        // the view is not destroyed when we change the message, so
        // subscriptions are accumulated and executed all at once.

        this.inboxService
            .getScopeInbox(messageCustomerCenterMessage)
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(message =>
            {
                this.message.set(message);

                // set selected message, this will be tagged in list component
                this.messageCenterService.selectedMessageSubject$.next(message);

                // clear previous timeout
                if (this.messageCenterService.currentTimeoutId)
                {
                    clearTimeout(this.messageCenterService.currentTimeoutId);
                }

                if (!message.isRead)
                {
                    this.messageCenterService.currentTimeoutId = setTimeout(() =>
                        this.actionService.action({
                            id          : 'message::messageCenter.detail.markAsRead',
                            isViewAction: false,
                            meta        : {
                                message,
                            },
                        })
                    , 4000);
                }
            });

        // Subscribe to message as deleted
        this.messageCenterService
            .deletedMessage$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((deletedMessage: MessageInbox) =>
            {
                this.message().id === deletedMessage.id && this.router.navigate(['message', 'message-center']);
            });
    }

    /**
     * Delete the given message
     */
    deleteMessage(message: MessageInbox): void
    {
        this.messageCenterService.deleteMessage(message);
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            case 'message::messageCenter.detail.markAsRead':
                await lastValueFrom(
                    this.inboxService
                        .readCustomerMessageInbox<MessageInbox>({
                            inbox: {
                                id       : action.meta.message.id,
                                tenantIds: action.meta.message.tenantIds,
                            },
                        }),
                );

                this.messageCenterService
                    .toggleMessageAsReadSubject$
                    .next(action.meta.message);

                // update current message
                this.message.set({
                    ...this.message(),
                    isRead: true,
                });
                break;

            case 'message::messageCenter.detail.markAsUnRead':
                await lastValueFrom(
                    this.inboxService
                        .unreadCustomerMessageInbox<MessageInbox>({
                            inbox: {
                                id       : action.meta.message.id,
                                tenantIds: action.meta.message.tenantIds,
                            },
                        }),
                );

                this.messageCenterService
                    .toggleMessageAsReadSubject$
                    .next(action.meta.message);

                // update current message
                this.message.set({
                    ...this.message(),
                    isRead: false,
                });
                break;

            case 'message::messageCenter.detail.downloadAttachment':
                this.downloadService
                    .download({
                        relativePathSegments: action.meta.attachment.relativePathSegments,
                        filename            : action.meta.attachment.filename,
                        originalFilename    : action.meta.attachment.originFilename,
                    });
                break;
        }
    }
}
