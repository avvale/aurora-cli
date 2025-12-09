import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { MessageInbox } from '@apps/message';
import { log } from '@aurora';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoService } from '@jsverse/transloco';
import { Observable, Subject, lastValueFrom } from 'rxjs';
import { InboxService } from '../../inbox';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    selectedMessageSubject$: Subject<MessageInbox> = new Subject();
    toggleMessageAsReadSubject$: Subject<MessageInbox> = new Subject();
    deletedMessageSubject$: Subject<MessageInbox> = new Subject();
    currentTimeoutId: ReturnType<typeof setTimeout>;
    confirmationService = inject(FuseConfirmationService);
    translocoService = inject(TranslocoService);
    inboxService = inject(InboxService);
    unreadMessagesNumber: WritableSignal<number> = signal(0);

    get selectedMessage$(): Observable<MessageInbox> {
        return this.selectedMessageSubject$.asObservable();
    }

    get toggleMessageAsRead$(): Observable<MessageInbox> {
        return this.toggleMessageAsReadSubject$.asObservable();
    }

    get deletedMessage$(): Observable<MessageInbox> {
        return this.deletedMessageSubject$.asObservable();
    }

    resetSelectedMessage(): void {
        this.selectedMessageSubject$.next(null);
    }

    deleteMessage(message: MessageInbox): void {
        const deleteDialogRef = this.confirmationService.open({
            title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('message.Message')}`,
            message: this.translocoService.translate('DeletionWarning', {
                entity: this.translocoService.translate('message.Message'),
            }),
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation-triangle',
                color: 'warn',
            },
            actions: {
                confirm: {
                    show: true,
                    label: this.translocoService.translate('Remove'),
                    color: 'warn',
                },
                cancel: {
                    show: true,
                    label: this.translocoService.translate('Cancel'),
                },
            },
            dismissible: true,
        });

        deleteDialogRef.afterClosed().subscribe(async (result) => {
            if (result === 'confirmed') {
                try {
                    await lastValueFrom(
                        this.inboxService.deleteCustomerMessageInbox<MessageInbox>(
                            {
                                id: message.id,
                            },
                        ),
                    );

                    this.deletedMessageSubject$.next(message);
                } catch (error) {
                    log(
                        `[DEBUG] Catch error in delete message action: ${error}`,
                    );
                }
            }
        });
    }

    async countUnreadMessages(): Promise<void> {
        this.unreadMessagesNumber.set(
            await lastValueFrom(
                this.inboxService.countUnreadCustomerMessageInbox(),
            ),
        );
    }
}
