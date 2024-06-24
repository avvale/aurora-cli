import { QueryList, TemplateRef } from '@angular/core';
import { GridCellValueTemplateDirective } from '../directives/grid-cell-value-template.directive';

export const gridCustomCellValuesTemplateDirectiveAdapter = (gridCustomCellValuesTemplate: { field: string; gridDialogCustomCellValuesTemplate: TemplateRef<any>; }[]): QueryList<GridCellValueTemplateDirective> =>
{
    const queryList = new QueryList<GridCellValueTemplateDirective>();
    const templateDirectives = [];
    for (const gridCustomCellValueTemplate of gridCustomCellValuesTemplate)
    {
        const gridCustomHeader = new GridCellValueTemplateDirective(gridCustomCellValueTemplate.gridDialogCustomCellValuesTemplate);
        gridCustomHeader.field = gridCustomCellValueTemplate.field;
        templateDirectives.push(gridCustomHeader);
    }
    queryList.reset(templateDirectives);

    return queryList;
};