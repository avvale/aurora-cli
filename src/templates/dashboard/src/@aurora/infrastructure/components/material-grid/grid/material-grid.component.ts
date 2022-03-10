import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActionEvent, ColumnConfig, ColumnConfigAction, ColumnDataType, GridData, GridTranslations, PageChangeEvent } from '../grid.types';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { merge, Subject, tap } from 'rxjs';
import cloneDeep from 'lodash-es/cloneDeep';
import { ColumnsDialogComponent } from '../columns-dialog/columns-dialog.component';
import { CommonLang } from '../../../../domain';

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
    // langs to create TranslationMenuComponent form multi language objects
    @Input() langs: CommonLang[] = [];
    // translations for component
    @Input() translations: GridTranslations = {
        Columns: 'Columns',
        Delete : 'Delete',
        Edit   : 'Edit',
    };

    // view children
    @ViewChild(MatPaginator) private paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    // outputs
    @Output() pageChange = new EventEmitter<PageChangeEvent>();
    @Output() action = new EventEmitter<ActionEvent>();
    @Output() closeColumnDialog = new EventEmitter<void>();
    @Output() columnsConfigChanged = new EventEmitter<ColumnConfig[]>();

    // set columns types for render each web component
    columnConfigType = ColumnDataType;
    columnsDialog = ColumnsDialogComponent; // dialog to sort columns
    changeColumnsConfig$: Subject<ColumnConfig[]> = new Subject();

    // clone columnsConfig to can reset columnsConfig to original status
    private _columnsConfig: ColumnConfig[] = [];
    private _originColumnsConfig: ColumnConfig[] = [];
    @Input() set columnsConfig(data: ColumnConfig[])
    {
        this._columnsConfig = cloneDeep(data);
        this._originColumnsConfig = cloneDeep(data);
    }
    get columnsConfig(): ColumnConfig[]
    {
        return this._columnsConfig;
    }

    get displayedColumns(): string[]
    {
        return this.columnsConfig
            .filter(item => !item.hidden)
            .map(item => item.field);
    }

    constructor (protected dialog: MatDialog) {}

    ngOnInit(): void
    {
        this.changeColumnsConfig$
            .subscribe(columnsConfig => this.columnsConfigChanged.emit(columnsConfig));
    }

    ngAfterViewInit(): void
    {
        if (this.paginator && this.sort)
        {
            // Reset back to the first page after sort
            this.sort.sortChange.subscribe(
                () => (this.paginator.pageIndex = 0),
            );

            merge(this.paginator.page, this.sort.sortChange)
                .pipe(
                    tap(() =>
                        this.pageChange.emit({
                            count : this.paginator.length,
                            offset:
                                this.paginator.pageIndex *
                                this.paginator.pageSize,
                            limit: this.paginator.pageSize,
                            sort : this.sort.active,
                            order: this.sort.direction,
                        }),
                    ),
                )
                .subscribe();
        }
    }

    handleClickAction(
        action: ColumnConfigAction,
        row: any,
        event: PointerEvent,
    ): void
    {
        this.action.emit({ action, row, event });
    }

    handleColumnsDialog(): void
    {
        const dialogRef = this.dialog.open(this.columnsDialog, {
            data: {
                columnsConfig       : this.columnsConfig,
                translations        : this.translations,
                changeColumnsConfig$: this.changeColumnsConfig$,
            },
        });

        dialogRef.afterClosed().subscribe(res =>
        {
            this.closeColumnDialog.emit();
        });
    }
}
