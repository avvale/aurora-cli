import { Component, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnConfig, ColumnsDialogTranslations } from '@aurora';
import { Subject } from 'rxjs';

@Component({
    selector: 'au-columns-dialog',
    template: `
        <div mat-dialog-title>
            <div class="title">
                <mat-icon class="mr-32">table_chart</mat-icon>
                \{{ translations?.Columns }}
            </div>

            <button mat-icon-button [disableRipple]="true" mat-dialog-close>
                <mat-icon>close</mat-icon>
            </button>
        </div>

        <div mat-dialog-content>
            <div
                cdkDropList
                class="columns-list"
                (cdkDropListDropped)="drop($event)"
            >
                <ng-container *ngFor="let columnConfig of columnsConfig">
                    <div
                        class="column"
                        cdkDrag
                        [ngClass]="{ 'cursor-move': !columnConfig.sticky }"
                        [cdkDragDisabled]="columnConfig.sticky"
                    >
                        <mat-icon class="mr-32">
                            \{{ columnConfig.sticky ? 'block' : 'reorder' }}
                        </mat-icon>

                        <mat-checkbox
                            class="mr-32"
                            [(ngModel)]="!columnConfig.hidden"
                            [disabled]="columnConfig.sticky"
                            (change)="handleChangeActiveColumn($event, columnConfig)"
                        >
                        </mat-checkbox>
                        \{{
                            columnConfig.translation ?
                            translations[columnConfig.translation.toPascalCase()] :
                            translations[columnConfig.field.toPascalCase()]
                        }}
                    </div>
                </ng-container>
            </div>
        </div>
    `,
    styleUrls: ['./columns-dialog.component.scss'],
})
export class ColumnsDialogComponent implements OnInit
{
    columnsConfig: ColumnConfig[];
    changeColumnsConfig$: Subject<ColumnConfig[]>;
    translations: ColumnsDialogTranslations = {
        Columns: 'Columns',
    };

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<ColumnsDialogComponent>,
    ) {}

    ngOnInit(): void
    {
        this.columnsConfig = this.data.columnsConfig;
        this.translations = { ...this.translations, ...this.data.translations };
        this.changeColumnsConfig$ = this.data.changeColumnsConfig$;
    }

    drop(event: CdkDragDrop<string[]>): void
    {
        moveItemInArray(
            this.columnsConfig,
            event.previousIndex,
            event.currentIndex,
        );

        this.changeColumnsConfig$.next(this.columnsConfig);
    }

    handleChangeActiveColumn($event, column): void
    {
        const index = this.columnsConfig.map(c => c.sort).indexOf(column.sort);
        this.columnsConfig[index].hidden = !$event.checked;

        this.changeColumnsConfig$.next(this.columnsConfig);
    }
}
