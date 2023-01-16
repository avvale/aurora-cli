import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnConfig, ColumnDataType, ColumnsConfigChange } from '../grid.types';
import cloneDeep from 'lodash-es/cloneDeep';

@Component({
    selector   : 'au-grid-columns-config-properties-dialog',
    templateUrl: 'grid-columns-config-properties-dialog.component.html',
    styleUrls  : ['./grid-columns-config-properties-dialog.component.scss'],
})
export class GridColumnsConfigPropertiesDialogComponent implements OnInit
{
    gridId: string;
    columnsConfig: ColumnConfig[];
    originColumnsConfig: ColumnConfig[];
    columnsConfigChange = new EventEmitter<ColumnsConfigChange>();
    columnsConfigReset = new EventEmitter<void>();

    // avoid change columns config of type ACTIONS and CHECKBOX
    get columnsConfigToList (): ColumnConfig[]
    {
        return this.columnsConfig.filter(column =>
            column.type !== ColumnDataType.CHECKBOX &&
            column.type !== ColumnDataType.ACTIONS &&
            column.type !== ColumnDataType.DRAG_AND_DROP,
        );
    }

    get howManyActionsColumn (): number
    {
        return this.columnsConfig.filter(column => column.type === ColumnDataType.ACTIONS).length;
    }

    get howManyCheckboxColumn (): number
    {
        return this.columnsConfig.filter(column => column.type === ColumnDataType.CHECKBOX).length;
    }

    get howManyDragAndDropColumn (): number
    {
        return this.columnsConfig.filter(column => column.type === ColumnDataType.DRAG_AND_DROP).length;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<GridColumnsConfigPropertiesDialogComponent>,
    ) { }

    ngOnInit(): void
    {
        this.gridId = this.data.gridId;
        this.columnsConfig = cloneDeep(this.data.columnsConfig);
        this.originColumnsConfig = cloneDeep(this.data.originColumnsConfig);
    }

    drop($event: CdkDragDrop<string[]>): void
    {
        let previousIndex = $event.previousIndex;
        let currentIndex  = $event.currentIndex;

        // avoid manipulate columns
        for (let i = 0; i < this.howManyActionsColumn; i++)
        {
            previousIndex++;
            currentIndex++;
        }

        for (let i = 0; i < this.howManyCheckboxColumn; i++)
        {
            previousIndex++;
            currentIndex++;
        }

        for (let i = 0; i < this.howManyDragAndDropColumn; i++)
        {
            previousIndex++;
            currentIndex++;
        }

        moveItemInArray(
            this.columnsConfig,
            previousIndex,
            currentIndex,
        );

        this.columnsConfigChange.emit({
            columnsConfig: this.columnsConfig,
            event        : $event,
        });
    }

    handleChangeVisibilityColumn($event, columnConfig): void
    {
        const index = this.columnsConfig.map(columnConfig => columnConfig.field).indexOf(columnConfig.field);
        this.columnsConfig[index].hidden = !$event.checked;

        this.columnsConfigChange.emit({
            columnsConfig: this.columnsConfig,
            event        : $event,
        });
    }

    resetColumnsConfig($event): void
    {
        this.columnsConfigChange.emit({
            columnsConfig: this.originColumnsConfig,
            event        : $event,
        });
    }
}
