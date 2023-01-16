import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output, QueryList, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionChange } from '@angular/cdk/collections';
import { Action } from '@aurora/aurora.types';
import { BehaviorSubject, Observable, of, Subject, takeUntil } from 'rxjs';
import { ColumnConfig, GridCustomHeaderTemplateDirective, GridData, GridState } from '../grid';
import { GridComponent } from '../grid/grid/grid.component';
import { GridCellValueTemplateDirective } from '../grid/directives/grid-cell-value-template.directive';
import { SelectionModel } from '../grid/selection-model/selection-model';

@Component({
    selector       : 'au-grid-dialog',
    templateUrl    : './grid-dialog.component.html',
    styleUrls      : ['grid-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDialogComponent
{
    gridId: string = 'grid';
    selectedCheckboxRowModel = new SelectionModel<any>(true, [], true, (a: any, b: any) => a.id === b.id);
    columnsConfig$: Observable<ColumnConfig[]>;
    selectedRows = [];

    // manage gridData
    gridDataSubject$: BehaviorSubject<GridData> = new BehaviorSubject(null);
    get gridData$(): Observable<GridData>
    {
        return this.gridDataSubject$.asObservable();
    }
    unsubscribeAll$: Subject<void> = new Subject();

    // view
    @ViewChild(GridComponent) gridComponent: GridComponent;

    // TODO añadir búsqeuda automática cuando esté presente este evento
    /* @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void
    {
        // console.log(event.key);
    } */

    // outputs
    @Output() action = new EventEmitter<Action>();
    @Output() columnFiltersChange = new EventEmitter<GridState>();
    @Output() columnsConfigChange = new EventEmitter<ColumnConfig[]>();
    @Output() dialogClose = new EventEmitter<void>();
    @Output() dialogOpen = new EventEmitter<void>();
    @Output() selectedCheckboxRowModelChange = new EventEmitter<SelectionChange<any>>();
    @Output() stateChange = new EventEmitter<GridState>();
    @Output() search = new EventEmitter<GridState>();
    @Output() searchOpen = new EventEmitter<void>();
    @Output() searchClose = new EventEmitter<void>();

    constructor(
        public dialogRef: MatDialogRef<GridDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            columnsConfig: ColumnConfig[] | Observable<ColumnConfig[]>;
            gridState: GridState;
            gridCellValuesTemplate: QueryList<GridCellValueTemplateDirective>;
            gridCustomHeadersTemplate: QueryList<GridCustomHeaderTemplateDirective>;
            gridData$: Observable<GridData>; // only can pass by data girdData Observable
            gridId: string;
            originColumnsConfig: ColumnConfig[];
            selectedCheckboxRowModel: SelectionModel<any>;
            selectedRows: any[];
            title: string;
        },
    )
    {
        // check if columns config is a observable
        if (data.columnsConfig instanceof Observable)
        {
            this.columnsConfig$ = data.columnsConfig;
        }
        else
        {
            this.columnsConfig$ = of(data.columnsConfig);
        }

        // set gridData directly by observable
        data
            .gridData$?.pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(gridData => this.gridDataSubject$.next(gridData));

        // ID of the grid
        this.gridId = data.gridId || this.gridId;

        // selection checkbox column
        this.selectedCheckboxRowModel = data.selectedCheckboxRowModel || this.selectedCheckboxRowModel;

        this.dialogRef.afterClosed().subscribe(() =>
        {
            this.dialogClose.emit();
            this.unsubscribeAll$.next();
        });
    }
}
