import { inject } from '@angular/core';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
import { QuickChatService } from 'app/layout/common/quick-chat/quick-chat.service';
import { ShortcutsService } from 'app/layout/common/shortcuts/shortcuts.service';
import { forkJoin, from, switchMap } from 'rxjs';

/* #region customizations */
import {
    GridTranslationsTranslocoInitService,
    InitializerService,
} from '@aurora';
/* #endregion customizations */

export const initialDataResolver = () => {
    const initializerService = inject(InitializerService);
    const navigationService = inject(NavigationService);
    const notificationsService = inject(NotificationsService);
    const quickChatService = inject(QuickChatService);
    const shortcutsService = inject(ShortcutsService);

    /* #region customizations */
    const gridTranslationsTranslocoInitService = inject(
        GridTranslationsTranslocoInitService,
    );
    /* #endregion customizations */

    return from(initializerService.resolverInitializer()).pipe(
        switchMap(() =>
            forkJoin([
                navigationService.get(),
                notificationsService.getAll(),
                quickChatService.getChats(),
                shortcutsService.getAll(),
                gridTranslationsTranslocoInitService.getAll(),
            ]),
        ),
    );
};
