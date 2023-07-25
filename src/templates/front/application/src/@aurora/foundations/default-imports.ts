import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent, TitleComponent } from '@aurora/components';
import { GridColumnTranslationComponent } from '@aurora/components/grid/grid-translations/grid-column-translation.component';
import { GridTranslationsComponent } from '@aurora/components/grid/grid-translations/grid-translations.component';
import { GridComponent } from '@aurora/components/grid/grid/grid.component';
import { GetSpinnerFlagPipe } from '@aurora/modules';
import { TranslocoModule } from '@ngneat/transloco';

export const defaultListImports = [
    AsyncPipe, BreadcrumbComponent, GridComponent, GridTranslationsComponent, GridColumnTranslationComponent, NgForOf, MatButtonModule, MatIconModule, MatSnackBarModule, RouterLink, TitleComponent, TranslocoModule,
];

export const defaultDetailImports = [
    AsyncPipe, BreadcrumbComponent, FormsModule, GetSpinnerFlagPipe, MatButtonModule, MatIconModule, MatInputModule, MatSnackBarModule, NgIf, TitleComponent, ReactiveFormsModule, TranslocoModule,
];