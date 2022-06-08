import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class CustomSpanishPaginator extends MatPaginatorIntl
{
    constructor(private translateService: TranslocoService)
    {
        super();

        this.initTranslations();
    }

    getRangeLabel = (page: number, pageSize: number, length: number): string =>
    {
        const of = this.translateService.translate('Paginator.Of');

        if (length === 0 || pageSize === 0)
        {
            return '0 ' + `${of} ` + length;
        }

        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return startIndex + 1 + ' - ' + endIndex + ` ${of} ` + length;
    };

    initTranslations(): void
    {
        this.translateService.langChanges$.subscribe(langChange =>
        {
            this.translate();
        });
    }

    translate(): void
    {
        super.itemsPerPageLabel = this.translateService.translate('Paginator.ItemsPerPageLabel');
        super.firstPageLabel = this.translateService.translate('Paginator.FirstPageLabel');
        super.lastPageLabel = this.translateService.translate('Paginator.LastPageLabel');
        super.nextPageLabel = this.translateService.translate('Paginator.NextPageLabel');
        super.previousPageLabel = this.translateService.translate('Paginator.PreviousPageLabel');
        this.changes.next();
    }
}