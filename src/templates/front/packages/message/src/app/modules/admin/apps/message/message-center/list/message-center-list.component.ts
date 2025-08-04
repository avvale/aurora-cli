import { DatePipe, NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewEncapsulation, WritableSignal, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InboxService } from '@apps/message/inbox';
import { MessageInbox, MessageService } from '@apps/message';
import { Action, BreadcrumbComponent, ColumnConfig, ColumnDataType, Crumb, GridFiltersStorageService, GridState, GridStateService, QueryStatementHandler, TitleComponent, ViewBaseComponent } from '@aurora';
import { TranslocoModule } from '@jsverse/transloco';
import { Observable, lastValueFrom, takeUntil } from 'rxjs';


export const messageCenterMainListId = 'message::messageCenter.list.mainList';
export const messageCenterPaginationListAction = 'message::messageCenter.list.pagination';
export const messageCenterExportListAction = 'message::messageCenter.list.export';
export const messageCustomerCenterMessageScope = 'message::customerCenterMessage';

@Component({
    selector: 'au-message-center-list',
    templateUrl: './message-center-list.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        BreadcrumbComponent, NgIf, MatButtonModule, MatIconModule, RouterLink, MatProgressBarModule,
        MatTooltipModule, NgClass, RouterOutlet, DatePipe, TitleComponent, TranslocoModule,
    ],
})
export class MessageCenterListComponent extends ViewBaseComponent
{
    @ViewChild('messageList') messageList: ElementRef;

    limit = 10;
    mailsLoading = false;
    currentPage: WritableSignal<number> = signal(0);
    messages: WritableSignal<MessageInbox[]> = signal([]);
    countMessages: WritableSignal<number> = signal(0);
    totalMessages: WritableSignal<number> = signal(0);
    firstMessageOfPage = computed(() => (this.currentPage() * this.limit) + 1);
    lastMessageOfPage = computed(() => (this.currentPage() * this.limit) + this.limit > this.totalMessages() ? this.totalMessages() : (this.currentPage() * this.limit) + this.limit);
    previousOffset = computed(() => (this.currentPage() - 1) * this.limit);
    currentOffset = computed(() => this.currentPage() * this.limit);
    nextOffset = computed(() => (this.currentPage() * this.limit) + this.limit);
    selectedMessage: WritableSignal<MessageInbox> = signal(null);

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: 'message.MessageCenter' },
    ];
    gridState: GridState = {};
    columnsConfig$: Observable<ColumnConfig[]>;
    originColumnsConfig: ColumnConfig[] = [
        {
            type       : ColumnDataType.STRING,
            field      : 'id',
            sort       : 'id',
            translation: 'Id',
        },
        {
            type       : ColumnDataType.STRING,
            field      : 'subject',
            sort       : 'subject',
            translation: 'Subject',
        },
    ];

    constructor(
        private readonly messageService: MessageService,
        private readonly gridStateService: GridStateService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly inboxService: InboxService,
    )
    {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        // we don't initialize the subscriptions in the handleAction because
        // the view is not destroyed when we change the message, so
        // subscriptions are accumulated and executed all at once.

        // Subscribe to message changes
        this.inboxService
            .getScopePagination(messageCustomerCenterMessageScope)
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(inboxCustomerPagination =>
            {
                this.messages.set(inboxCustomerPagination.rows);
                this.countMessages.set(inboxCustomerPagination.count);
                this.totalMessages.set(inboxCustomerPagination.total);
            });

        // Subscribe to selected message
        this.messageService
            .selectedMessage$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((selectedMessage: MessageInbox) =>
            {
                this.selectedMessage.set(selectedMessage);
            });

        // Subscribe to toggle message as read
        this.messageService
            .toggleMessageAsRead$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((toggleMessage: MessageInbox) =>
            {
                const messages = this.messages();
                this.messages.set(
                    messages.map(message =>
                    {
                        if (message.id === toggleMessage.id) message.isRead = !message.isRead;
                        return message;
                    }),
                );
            });

        // Subscribe to message as deleted
        this.messageService
            .deletedMessage$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((deletedMessage: MessageInbox) =>
            {
                this.actionService.action({
                    id          : 'message::messageCenter.list.pagination',
                    isViewAction: false,
                    meta        : {
                        query: {
                            offset: this.currentOffset(),
                            limit : this.limit,
                            order : [['sort', 'desc']],
                        },
                    },
                });
            });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            case 'message::messageCenter.list.pagination':
                this.currentPage.set(action.meta.query.offset / this.limit);

                await lastValueFrom(
                    this.inboxService
                        .paginateCustomerCenterMessagesInbox({
                            query: action.meta.query ?
                                action.meta.query :
                                QueryStatementHandler
                                    .init({ columnsConfig: this.originColumnsConfig })
                                    .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(messageCenterMainListId))
                                    .setSort(this.gridStateService.getSort(messageCenterMainListId))
                                    .setPage(this.gridStateService.getPage(messageCenterMainListId))
                                    .setSearch(this.gridStateService.getSearchState(messageCenterMainListId))
                                    .getQueryStatement(),
                        }),
                );
                break;
        }
    }
}
