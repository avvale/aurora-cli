import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import cloneDeep from 'lodash-es/cloneDeep';
import { GridTranslatePipe } from '../grid-translations/grid-translate.pipe';
import { ColumnConfig, ColumnDataType, ColumnsConfigChange } from '../grid.types';

@Component({
    selector   : 'au-grid-columns-config-properties-dialog',
    templateUrl: 'grid-columns-config-properties-dialog.component.html',
    styleUrls  : ['./grid-columns-config-properties-dialog.component.scss'],
    standalone : true,
    imports    : [
        AsyncPipe, GridTranslatePipe, MatButtonModule, MatCheckboxModule, MatDialogModule, DragDropModule,
        MatIconModule,NgForOf, FormsModule
    ],
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
