import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TranslocoService } from '@jsverse/transloco';
import { GridTranslationsService } from './grid-translations.service';

@Injectable({
    providedIn: 'root',
})
export class GridTranslationsTranslocoInitService
{
    constructor(
        private readonly translocoService: TranslocoService,
        private readonly gridTranslationsService: GridTranslationsService,
    ) {}

    getAll(): Observable<boolean>
    {
        this.translocoService
            .selectTranslateObject({
                Search                       : null,
                Actions                      : null,
                AND                          : null,
                ClearFilters                 : null,
                ClickAndDragInfo             : null,
                Columns                      : null,
                Field                        : null,
                Filter                       : null,
                Find                         : null,
                NoResultsFound               : null,
                Operator                     : null,
                OR                           : null,
                PleaseSelectField            : null,
                ResetColumnsConfig           : null,
                SelectedOptions              : null,
                Translations                 : null,
                Value                        : null,
                'Operators.Contains'         : null,
                'Operators.ContainsAny'      : null,
                'Operators.EndsWith'         : null,
                'Operators.Equals'           : null,
                'Operators.GreaterThan'      : null,
                'Operators.GreaterThanEqual' : null,
                'Operators.LessThan'         : null,
                'Operators.LessThanEqual'    : null,
                'Operators.MustContain'      : null,
                'Operators.NotEquals'        : null,
                'Operators.StartsWith'       : null,
                'Paginator.FirstPageLabel'   : null,
                'Paginator.ItemsPerPageLabel': null,
                'Paginator.LastPageLabel'    : null,
                'Paginator.NextPageLabel'    : null,
                'Paginator.OfLabel'          : null,
                'Paginator.PreviousPageLabel': null,
                Edit                         : null,
                Delete                       : null,
            })
            .subscribe(response =>
            {
                const [
                    search,
                    actions,
                    and,
                    clearFilters,
                    clickAndDragInfo,
                    columns,
                    field,
                    filter,
                    find,
                    noResultsFound,
                    operator,
                    or,
                    pleaseSelectField,
                    resetColumnsConfig,
                    selectedOptions,
                    translations,
                    value,
                    contains,
                    containsAny,
                    endsWith,
                    equals,
                    greaterThan,
                    greaterThanEqual,
                    lessThan,
                    lessThanEqual,
                    mustContain,
                    notEquals,
                    startsWith,
                    firstPageLabel,
                    itemsPerPageLabel,
                    lastPageLabel,
                    nextPageLabel,
                    ofLabel,
                    previousPageLabel,
                    edit,
                    deleteMessage,
                ] = response;

                // messages
                this.gridTranslationsService.setMessage('search', search);
                this.gridTranslationsService.setMessage('actions', actions);
                this.gridTranslationsService.setMessage('AND', and);
                this.gridTranslationsService.setMessage('clearFilters', clearFilters);
                this.gridTranslationsService.setMessage('clickAndDragInfo', clickAndDragInfo);
                this.gridTranslationsService.setMessage('columns', columns);
                this.gridTranslationsService.setMessage('field', field);
                this.gridTranslationsService.setMessage('field', field);
                this.gridTranslationsService.setMessage('filter', filter);
                this.gridTranslationsService.setMessage('find', find);
                this.gridTranslationsService.setMessage('noResultsFound', noResultsFound);
                this.gridTranslationsService.setMessage('operator', operator);
                this.gridTranslationsService.setMessage('OR', or);
                this.gridTranslationsService.setMessage('pleaseSelectField', pleaseSelectField);
                this.gridTranslationsService.setMessage('resetColumnsConfig', resetColumnsConfig);
                this.gridTranslationsService.setMessage('selectedOptions', selectedOptions);
                this.gridTranslationsService.setMessage('translations', translations);
                this.gridTranslationsService.setMessage('value', value);

                // operators
                this.gridTranslationsService.setOperatorMessage('contains', contains);
                this.gridTranslationsService.setOperatorMessage('containsAny', containsAny);
                this.gridTranslationsService.setOperatorMessage('endsWith', endsWith);
                this.gridTranslationsService.setOperatorMessage('equals', equals);
                this.gridTranslationsService.setOperatorMessage('greaterThan', greaterThan);
                this.gridTranslationsService.setOperatorMessage('greaterThanEqual', greaterThanEqual);
                this.gridTranslationsService.setOperatorMessage('lessThan', lessThan);
                this.gridTranslationsService.setOperatorMessage('lessThanEqual', lessThanEqual);
                this.gridTranslationsService.setOperatorMessage('mustContain', mustContain);
                this.gridTranslationsService.setOperatorMessage('notEquals', notEquals);
                this.gridTranslationsService.setOperatorMessage('startsWith', startsWith);

                // paginator
                this.gridTranslationsService.setPaginatorMessage('firstPageLabel', firstPageLabel);
                this.gridTranslationsService.setPaginatorMessage('itemsPerPageLabel', itemsPerPageLabel);
                this.gridTranslationsService.setPaginatorMessage('lastPageLabel', lastPageLabel);
                this.gridTranslationsService.setPaginatorMessage('nextPageLabel', nextPageLabel);
                this.gridTranslationsService.setPaginatorMessage('ofLabel', ofLabel);
                this.gridTranslationsService.setPaginatorMessage('previousPageLabel', previousPageLabel);

                // action
                this.gridTranslationsService.setActionMenuMessage('edit', edit);
                this.gridTranslationsService.setActionMenuMessage('delete', deleteMessage);
            });

        return of(true);
    }
}
