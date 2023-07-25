import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { GridTranslationsService } from './grid-translations.service';
import { GridMessages } from '../grid.types';

/**
 * Check which action to perform depending on whether or not the language exists.
 */
@Pipe({
    name: 'gridTranslate',
    standalone: true,
})
export class GridTranslatePipe implements PipeTransform, OnDestroy
{
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private gridTranslationsService: GridTranslationsService,
    )
    {}

    transform(key: string, type: 'column' | 'message' | 'action' = 'message', scope = 'grid'): Observable<string>
    {
        if (type === 'message')
        {
            return this.gridTranslationsService
                .getMessage(scope, key as keyof GridMessages)
                .pipe(takeUntil(this._unsubscribeAll));
        }
        else if (type === 'column')
        {
            return this.gridTranslationsService
                .getColumnMessage(scope, key)
                .pipe(
                    takeUntil(this._unsubscribeAll),
                );
        }
        else
        {
            return this.gridTranslationsService
                .getActionsMenuMessages(scope)
                .pipe(
                    takeUntil(this._unsubscribeAll),
                    map(actionsMenuMessages => actionsMenuMessages[key]),
                );
        }
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
