import { Component, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnConfig, ColumnsDialogTranslations } from '@aurora';
import { Subject } from 'rxjs';

@Component({
    selector: 'au-columns-dialog',
    template: `
        <div mat-dialog-title class="dialog-header">
            <div class="title">
                <mat-icon>table_chart</mat-icon>
                <span>{{ translations?.Columns }}</span>
            </div>

            <button mat-icon-button [disableRipple]="true" mat-dialog-close>
                <mat-icon>close</mat-icon>
            </button>
        </div>

        <div mat-dialog-content *transloco="let t">
            <div
                cdkDropList
                class="columns-list"
                (cdkDropListDropped)="drop($event)"
            >
                <span class="helper">{{ t('ClickAndDragInfo') }}</span>
                <hr>
                <ng-container *ngFor="let columnConfig of columnsConfig">
                    <div
                        class="column"
                        cdkDrag
                        [ngClass]="{ 'cursor-move': !columnConfig.sticky }"
                        [cdkDragDisabled]="columnConfig.sticky"
                    >
                        <div class="flex">
                            <mat-checkbox
                                [(ngModel)]="!columnConfig.hidden"
                                [disabled]="columnConfig.sticky"
                                (change)="handleChangeActiveColumn($event, columnConfig)"
                            >
                            </mat-checkbox>

                            <span>
                            {{
                                columnConfig.translation ?
                                translations[columnConfig.translation.toPascalCase()] :
                                translations[columnConfig.field.toPascalCase()]
                            }}
                            </span>
                        </div>

                        <mat-icon>drag_indicator</mat-icon>
                    </div>

                    <hr>
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
    ) { }

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

        // this makes it so actions column is always index 0
        this.columnsConfig = [...this.columnsConfig.sort(function (x, y) { return x.field == 'Actions' ? -1 : y.field == 'Actions' ? 1 : 0; })];
        this.changeColumnsConfig$.next(this.columnsConfig);
    }

    handleChangeActiveColumn($event, column): void
    {
        const index = this.columnsConfig.map(c => c.sort).indexOf(column.sort);
        this.columnsConfig[index].hidden = !$event.checked;

        this.changeColumnsConfig$.next(this.columnsConfig);
    }
}
