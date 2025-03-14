import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent, GridModule, TitleComponent } from '@aurora/components';
import { GetSpinnerFlagPipe } from '@aurora/modules';
import { TranslocoModule } from '@jsverse/transloco';

export const defaultListImports = [
    AsyncPipe, BreadcrumbComponent, GridModule, NgForOf, MatButtonModule, MatIconModule, MatSnackBarModule, RouterLink, TitleComponent, TranslocoModule,
];

export const defaultDetailImports = [
    AsyncPipe, BreadcrumbComponent, FormsModule, GetSpinnerFlagPipe, MatButtonModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule, NgIf, TitleComponent, ReactiveFormsModule, TranslocoModule,
];