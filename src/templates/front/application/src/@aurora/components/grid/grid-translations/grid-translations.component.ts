// angular
import { ChangeDetectionStrategy, Component, Host, Input, Optional } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { GridTranslationsService } from './grid-translations.service';
import { GridActionsMenuMessages, GridOperatorsMessages, GridPaginatorMessages } from '../grid.types';

@Component({
    selector       : 'au-grid-translations',
    template       : '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
})
export class GridTranslationsComponent
{
    @Input('for') scope: string = 'defaultGridScope';

    // operators
    @Input() set operators(operatorsMessages: GridOperatorsMessages)
    {
        this.gridTranslationsService.setOperatorsMessages(this.scope, operatorsMessages);
    }

    // paginator
    @Input() set paginator(paginatorMessages: GridPaginatorMessages)
    {
        this.gridTranslationsService.setPaginatorMessages(this.scope, paginatorMessages);
    }

    // actions menu
    @Input() set actionsMenu(actionsMenuMessages: GridActionsMenuMessages)
    {
        this.gridTranslationsService.setActionsMenuMessages(this.scope, actionsMenuMessages);
    }

    // messages translations
    @Input() set actions(message: string)
    {
        this.gridTranslationsService.setMessage('actions', message, this.scope);
    }
    @Input() set AND(message: string)
    {
        this.gridTranslationsService.setMessage('AND', message, this.scope);
    }
    @Input() set clearFilters(message: string)
    {
        this.gridTranslationsService.setMessage('clearFilters', message, this.scope);
    }
    @Input() set clickAndDragInfo(message: string)
    {
        this.gridTranslationsService.setMessage('clickAndDragInfo', message, this.scope);
    }
    @Input() set columns(message: string)
    {
        this.gridTranslationsService.setMessage('columns', message, this.scope);
    }
    @Input() set field(message: string)
    {
        this.gridTranslationsService.setMessage('field', message, this.scope);
    }
    @Input() set filter(message: string)
    {
        this.gridTranslationsService.setMessage('filter', message, this.scope);
    }
    @Input() set noData(message: string)
    {
        this.gridTranslationsService.setMessage('noData', message, this.scope);
    }
    @Input() set operator(message: string)
    {
        this.gridTranslationsService.setMessage('operator', message, this.scope);
    }
    @Input() set OR(message: string)
    {
        this.gridTranslationsService.setMessage('OR', message, this.scope);
    }
    @Input() set pleaseSelectField(message: string)
    {
        this.gridTranslationsService.setMessage('pleaseSelectField', message, this.scope);
    }
    @Input() set resetColumnsConfig(message: string)
    {
        this.gridTranslationsService.setMessage('resetColumnsConfig', message, this.scope);
    }
    @Input() set search(message: string)
    {
        this.gridTranslationsService.setMessage('search', message, this.scope);
    }
    @Input() set translations(message: string)
    {
        this.gridTranslationsService.setMessage('translations', message, this.scope);
    }
    @Input() set value(message: string)
    {
        this.gridTranslationsService.setMessage('value', message, this.scope);
    }

    constructor(
        @Optional() @Host() private parent: GridComponent,
        private gridTranslationsService: GridTranslationsService,
    ) { }
}
