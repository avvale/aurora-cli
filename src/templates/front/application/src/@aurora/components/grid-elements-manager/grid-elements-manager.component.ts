import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Action } from '@aurora/aurora.types';
import { GridComponent, GridCustomHeaderTemplateDirective } from '@aurora/components/grid';
import { ColumnConfig, GridData, GridState } from '../grid/grid.types';
import { GridCustomButtonsHeaderDialogTemplateDirective } from './directives/grid-custom-buttons-header-dialog-template.directive';
import { GridElementsManagerCellValueTemplateDirective } from './directives/grid-elements-manager-cell-value-template.directive';
import { GridFormElementDetailDialogTemplateDirective } from './directives/grid-form-element-detail-dialog-template.directive';
import { GridElementDetailDialogComponent } from './grid-element-detail-dialog.component';

@Component({
    selector       : 'au-grid-elements-manager',
    templateUrl    : './grid-elements-manager.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        GridComponent, GridCustomHeaderTemplateDirective, NgForOf, NgIf, NgTemplateOutlet,
    ],
})
export class GridElementsManagerComponent
{
    @Input() id: string = 'grid';
    // component label
    @Input() label: string;
    // title of dialog
    @Input() dialogTitle: string;
    // grid state
    @Input() gridState: GridState;
    @Input() columnsConfig: ColumnConfig[];
    @Input() originColumnsConfig: ColumnConfig[];
    // inputs
    @Input() gridData: GridData;
    @Input('dialogIcon') dialogIcon: string = 'filter_list';
    @Input('dialogSvgIcon') dialogSvgIcon: string = '';
    @Input('dialogWidth') dialogWidth: string = '90vw';
    @Input('dialogMaxWidth') dialogMaxWidth: string = '2048px';
    @Input('dialogMinWidth') dialogMinWidth: string = '240px';
    @Input('dialogHeight') dialogHeight: string = 'auto';
    @Input() hasSearch: boolean = true;
    @Input() hasFilterButton: boolean = true;

    // outputs
    @Output() action = new EventEmitter<Action>();
    @Output() columnFiltersChange = new EventEmitter<GridState>();
    @Output() columnsConfigChange = new EventEmitter<ColumnConfig[]>();
    @Output() dialogClose = new EventEmitter<void>();
    @Output() dialogOpen = new EventEmitter<void>();
    @Output() stateChange = new EventEmitter<GridState>();
    @Output() search = new EventEmitter<GridState>();

    // add custom buttons header
    @ContentChild(GridCustomButtonsHeaderDialogTemplateDirective) gridCustomButtonsHeaderDialogTemplate?: GridCustomButtonsHeaderDialogTemplateDirective;
    // directive to set form item detail
    @ContentChild(GridFormElementDetailDialogTemplateDirective) gridFormElementDetailDialogTemplate?: GridFormElementDetailDialogTemplateDirective;
    // directive to set custom values in cells
    @ContentChildren(GridElementsManagerCellValueTemplateDirective) gridElementsManagerCellValueTemplate?: QueryList<GridElementsManagerCellValueTemplateDirective>;

    constructor(
        private dialog: MatDialog,
    ) {}

    handleElementDetailDialog(actionId: string): void
    {
        const elementDetailDialogRef = this.dialog.open(GridElementDetailDialogComponent,
            {
                panelClass: 'au-dialog',
                width     : this.dialogWidth,
                maxWidth  : this.dialogMaxWidth,
                minWidth  : this.dialogMinWidth,
                height    : this.dialogHeight,
                autoFocus : false,
                data      : {
                    title                              : this.dialogTitle,
                    icon                               : this.dialogIcon,
                    svgIcon                            : this.dialogSvgIcon,
                    currentActionId                    : actionId,
                    gridFormElementDetailDialogTemplate: this.gridFormElementDetailDialogTemplate,
                },
            });

        elementDetailDialogRef
            .afterOpened()
            .subscribe(() => this.dialogOpen.next());

        elementDetailDialogRef
            .afterClosed()
            .subscribe(() => this.dialogClose.next());
    }
}
