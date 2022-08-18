import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { GridTranslationsService } from '../grid-translations/grid-translations.service';

@Injectable()
export class PaginatorIntlService extends MatPaginatorIntl
{
    ofLabel: string;
    gridId: string = 'grid';

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
            .getPaginatorMessages(this.gridId)
            .subscribe(paginatorMessages =>
            {
                this.firstPageLabel = paginatorMessages.firstPageLabel;
                this.itemsPerPageLabel = paginatorMessages.itemsPerPageLabel;
                this.lastPageLabel = paginatorMessages.lastPageLabel;
                this.nextPageLabel = paginatorMessages.nextPageLabel;
                this.previousPageLabel = paginatorMessages.previousPageLabel;
                this.ofLabel = paginatorMessages.ofLabel;
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