import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { GridTranslationsService } from '../grid-translations/grid-translations.service';

@Injectable()
export class PaginatorIntlService extends MatPaginatorIntl
{
    ofLabel: string;
    paginatorScope: string = 'defaultGridScope';

    constructor(
        private gridTranslationsService: GridTranslationsService,
    )
    {
        super();
        this.init();
    }

    init(): void
    {
        this.gridTranslationsService
            .getPaginatorMessage('firstPageLabel', this.paginatorScope)
            .subscribe(firstPageLabel =>
            {
                this.firstPageLabel = firstPageLabel;
                this.changes.next();
            });

        this.gridTranslationsService
            .getPaginatorMessage('itemsPerPageLabel', this.paginatorScope)
            .subscribe(itemsPerPageLabel =>
            {
                this.itemsPerPageLabel = itemsPerPageLabel;
                this.changes.next();
            });

        this.gridTranslationsService
            .getPaginatorMessage('lastPageLabel', this.paginatorScope)
            .subscribe(lastPageLabel =>
            {
                this.lastPageLabel = lastPageLabel;
                this.changes.next();
            });

        this.gridTranslationsService
            .getPaginatorMessage('nextPageLabel', this.paginatorScope)
            .subscribe(nextPageLabel =>
            {
                this.nextPageLabel = nextPageLabel;
                this.changes.next();
            });

        this.gridTranslationsService
            .getPaginatorMessage('previousPageLabel', this.paginatorScope)
            .subscribe(previousPageLabel =>
            {
                this.previousPageLabel = previousPageLabel;
                this.changes.next();
            });

        this.gridTranslationsService
            .getPaginatorMessage('ofLabel', this.paginatorScope)
            .subscribe(ofLabel =>
            {
                this.ofLabel = ofLabel;
                this.changes.next();
            });
    }


    getRangeLabel = (page: number, pageSize: number, length: number): string =>
    {
        if (length === 0 || pageSize === 0)
        {
            return '0 ' + `${this.ofLabel} ` + length;
        }

        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return startIndex + 1 + ' - ' + endIndex + ` ${this.ofLabel} ` + length;
    };
}