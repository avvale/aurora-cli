import { QueryList, TemplateRef } from '@angular/core';
import { GridCustomHeaderTemplateDirective } from '../directives/grid-custom-header-template.directive';
import { GridCustomHeaderPosition } from '../grid.types';

export const gridCustomHeaderTemplateDirectiveAdapter = (gridCustomHeadersTemplate: { position: GridCustomHeaderPosition; gridDialogCustomHeaderTemplates: TemplateRef<any>; }[]): QueryList<GridCustomHeaderTemplateDirective> =>
{
    const queryList = new QueryList<GridCustomHeaderTemplateDirective>();
    const templateDirectives = [];
    for (const gridCustomHeaderTemplate of gridCustomHeadersTemplate)
    {
        const gridCustomHeader = new GridCustomHeaderTemplateDirective(gridCustomHeaderTemplate.gridDialogCustomHeaderTemplates);
        gridCustomHeader.position = gridCustomHeaderTemplate.position;
        templateDirectives.push(gridCustomHeader);
    }
    queryList.reset(templateDirectives);

    return queryList;
};