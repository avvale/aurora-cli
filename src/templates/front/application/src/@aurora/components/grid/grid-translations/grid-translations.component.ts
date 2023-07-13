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
    @Input('for') scope: string = 'grid';

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
        this.gridTranslationsService.setMessage(this.scope, 'actions', message);
    }
    @Input() set AND(message: string)
    {
        this.gridTranslationsService.setMessage(this.scope, 'AND', message);
    }
    @Input() set clearFilters(message: string)
    {
        this.gridTranslationsService.setMessage(this.scope, 'clearFilters', message);
    }
    @Input() set clickAndDragInfo(message: string)
    {
        this.gridTranslationsService.setMessage(this.scope, 'clickAndDragInfo', message);
    }
    @Input() set columns(message: string)
    {
        this.gridTranslationsService.setMessage(this.scope, 'columns', message);
    }
    @Input() set field(message: string)
    {
        this.gridTranslationsService.setMessage(this.scope, 'field', message);
    }
    @Input() set filter(message: string)
    {
        this.gridTranslationsService.setMessage(this.scope, 'filter', message);
    }
    @Input() set noData(message: string)
    {
        this.gridTranslationsService.setMessage(this.scope, 'noData', message);
    }
    @Input() set operator(message: string)
    {
        this.gridTranslationsService.setMessage(this.scope, 'operator', message);
    }
    @Input() set OR(message: string)
    {
        this.gridTranslationsService.setMessage(this.scope, 'OR', message);
    }
    @Input() set pleaseSelectField(message: string)
    {
        this.gridTranslationsService.setMessage(this.scope, 'pleaseSelectField', message);
    }
    @Input() set resetColumnsConfig(message: string)
    {
        this.gridTranslationsService.setMessage(this.scope, 'resetColumnsConfig', message);
    }
    @Input() set search(message: string)
    {
        this.gridTranslationsService.setMessage(this.scope, 'search', message);
    }
    @Input() set translations(message: string)
    {
        this.gridTranslationsService.setMessage(this.scope, 'translations', message);
    }
    @Input() set value(message: string)
    {
        this.gridTranslationsService.setMessage(this.scope, 'value', message);
    }

    constructor(
        @Optional() @Host() private parent: GridComponent,
        private gridTranslationsService: GridTranslationsService,
    ) { }
}
