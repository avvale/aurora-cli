import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable, Subject } from 'rxjs';
import { MessagesService } from 'app/layout/common/messages/messages.service';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
import { QuickChatService } from 'app/layout/common/quick-chat/quick-chat.service';
import { ShortcutsService } from 'app/layout/common/shortcuts/shortcuts.service';

// ---- customizations ----
import { IamService } from '@aurora';

@Injectable({
    providedIn: 'root',
})
export class InitialDataResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _messagesService: MessagesService,
        private _navigationService: NavigationService,
        private _notificationsService: NotificationsService,
        private _quickChatService: QuickChatService,
        private _shortcutsService: ShortcutsService,
        private iamService: IamService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<any>
    {
        // if refresh page, account iamService will be requested
        // from bootstrapService, then we don't need to request again
        if (this.iamService.me)
        {
            return forkJoin({
                navigationService   : this._navigationService.get(),
                messagesService     : this._messagesService.getAll(),
                notificationsService: this._notificationsService.getAll(),
                quickChatService    : this._quickChatService.getChats(),
                shortcutsService    : this._shortcutsService.getAll(),
            });
        }

        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin({
            navigationService   : this._navigationService.get(),
            messagesService     : this._messagesService.getAll(),
            notificationsService: this._notificationsService.getAll(),
            quickChatService    : this._quickChatService.getChats(),
            shortcutsService    : this._shortcutsService.getAll(),
        });
    }
}
