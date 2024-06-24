import { inject } from '@angular/core';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
import { QuickChatService } from 'app/layout/common/quick-chat/quick-chat.service';
import { ShortcutsService } from 'app/layout/common/shortcuts/shortcuts.service';
import { forkJoin } from 'rxjs';

// ---- customizations ----
import { InboxService } from '@apps/message/inbox';
import { GridTranslationsTranslocoInitService } from '@aurora';

export const initialDataResolver = () => {
    const navigationService = inject(NavigationService);
    const notificationsService = inject(NotificationsService);
    const quickChatService = inject(QuickChatService);
    const shortcutsService = inject(ShortcutsService);

    // ---- customizations ----
    const inboxService = inject(InboxService);
    // prettier-ignore
    const gridTranslationsTranslocoInitService = inject(GridTranslationsTranslocoInitService);

    // Fork join multiple API endpoint calls to wait all of them to finish
    return forkJoin([
        navigationService.get(),
        notificationsService.getAll(),
        quickChatService.getChats(),
        shortcutsService.getAll(),
        inboxService.checkMessagesInbox(),
        gridTranslationsTranslocoInitService.getAll(),
    ]);
};
