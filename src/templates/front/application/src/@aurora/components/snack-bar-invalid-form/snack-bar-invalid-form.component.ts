import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'snack-bar-invalid-form',
    template: `
        <span
            matSnackBarLabel
        >
            {{ data.message }}
        </span>
        <span matSnackBarActions>
            <button
                mat-button
                matSnackBarAction
                (click)="snackBarRef.dismissWithAction()"
            >
                <mat-icon
                    class="mr-2"
                    color="warn"
                    svgIcon="mat_outline:sim_card_alert"
                >
                </mat-icon>
                {{ data.textButton }}
            </button>
        </span>
    `,
    styles: `
      :host {
        display: flex;
      }
    `,
    imports: [
        MatButtonModule, MatIconModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction,
    ],
})
export class SnackBarInvalidFormComponent
{
    snackBarRef = inject(MatSnackBarRef);
    data = inject(MAT_SNACK_BAR_DATA);
}