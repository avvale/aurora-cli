import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AttachmentTranslationsService } from './attachment-translations.service';
import { AttachmentMessages } from '../attachments.types';

/**
 * Check which action to perform depending on whether or not the language exists.
 */
@Pipe({
    name      : 'attachmentTranslate',
    standalone: true,
})
export class AttachmentTranslatePipe implements PipeTransform, OnDestroy
{
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private attachmentTranslationsService: AttachmentTranslationsService,
    )
    {}

    transform(key: string, type: 'message' = 'message', scope = 'attachments'): Observable<string>
    {
        if (type === 'message')
        {
            return this.attachmentTranslationsService
                .getMessage(key as keyof AttachmentMessages, scope)
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
