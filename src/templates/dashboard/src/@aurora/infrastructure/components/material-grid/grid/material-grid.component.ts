import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActionEvent, ColumnConfig, ColumnConfigAction, ColumnDataType, GridData, PageChangeEvent } from '../grid.types';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonLang } from '../../../../domain';
import { merge, tap } from 'rxjs';
import cloneDeep from 'lodash-es/cloneDeep';

@Component({
    selector       : 'au-material-grid',
    templateUrl    : './material-grid.component.html',
    styleUrls      : ['./material-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialGridComponent implements OnInit, AfterViewInit
{
    // inputs
    @Input() data: GridData;
    @Input() langs: CommonLang[] = [];  // langs to create TranslationMenuComponent, this langs will be checked

    // clone columnsConfig to can reset columnsConfig to original status
    private _columnsConfig: ColumnConfig[] = [];
    private _originColumnsConfig: ColumnConfig[] = [];
    @Input() set columnsConfig(data: ColumnConfig[])
    {
        this._columnsConfig         = cloneDeep(data);
        this._originColumnsConfig   = cloneDeep(data);

    }
    get columnsConfig(): ColumnConfig[]
    {
        return this._columnsConfig;
    }

    get displayedColumns(): string[]
    {
        return this.columnsConfig.filter(item => !item.hidden).map(item => item.field);
    }

    // view children
    @ViewChild(MatPaginator) private paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    // outputs
    @Output() pageChange = new EventEmitter<PageChangeEvent>();
    @Output() action = new EventEmitter<ActionEvent>();

    // set columns types for render each web component
    columnConfigType = ColumnDataType;

    ngOnInit(): void { /**/ }

    ngAfterViewInit(): void
    {
        if (this.paginator && this.sort)
        {
            // Reset back to the first page after sort
            this.sort
                .sortChange
                .subscribe(() => this.paginator.pageIndex = 0);

            merge(this.paginator.page, this.sort.sortChange)
                .pipe(
                    tap(() => this.pageChange.emit({
                        count : this.paginator.length,
                        offset: this.paginator.pageIndex * this.paginator.pageSize,
                        limit : this.paginator.pageSize,
                        sort  : this.sort.active,
                        order : this.sort.direction,
                    })),
                )
                .subscribe();
        }
    }

    onClickAction(action: ColumnConfigAction, row: any, event: PointerEvent): void
    {
        this.action.emit({ action, row, event });
    }
}
