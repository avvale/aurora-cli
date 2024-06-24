import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { GridTranslationsService } from './grid-translations.service';
import { GridMessages, GridOperatorMessages, GridActionMenuMessages } from '../grid.types';

/**
 * Check which action to perform depending on whether or not the language exists.
 */
@Pipe({
    name      : 'gridTranslate',
    standalone: true,
})
export class GridTranslatePipe implements PipeTransform, OnDestroy
{
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private gridTranslationsService: GridTranslationsService,
    )
    {}

    transform(key: string, type: 'column' | 'message' | 'operator' | 'action' = 'message', scope = 'grid'): Observable<string>
    {
        switch (type)
        {
            case 'message':
                return this.gridTranslationsService
                    .getMessage(key as keyof GridMessages, scope)
                    .pipe(takeUntil(this._unsubscribeAll));

            case 'operator':
                return this.gridTranslationsService
                    .getOperatorMessage(key as keyof GridOperatorMessages, scope)
                    .pipe(takeUntil(this._unsubscribeAll));

            case 'column':
                return this.gridTranslationsService
                    .getColumnMessage(scope, key)
                    .pipe(takeUntil(this._unsubscribeAll));

            case 'action':
                return this.gridTranslationsService
                    .getActionMenuMessage(key as keyof GridActionMenuMessages, scope)
                    .pipe(takeUntil(this._unsubscribeAll));
        }
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
