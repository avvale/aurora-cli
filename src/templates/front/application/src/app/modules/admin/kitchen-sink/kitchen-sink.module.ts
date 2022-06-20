import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { DatePickerDayjsAdapter, DatePickerDayjsFormats, DatepickerModule, ValidationMessagesModule, DecimalModule } from '@aurora';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Navigation } from 'app/core/navigation/navigation.types';
import { SharedModule } from 'app/shared/shared.module';
import { first } from 'rxjs';

// Material
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';

// Kitchen sink declarations
import { kitchenSinkRoutes } from './kitchen-sink.routing';
import { KitchenSinkComponent } from './kitchen-sink.component';

// Components
import { DecimalsComponent } from './decimals/decimals.component';
import { GridComponent } from './grid/grid.component';
import { kitchenSink } from './kitchen-sink.menu';


@NgModule({
    imports: [
        RouterModule.forChild(kitchenSinkRoutes),
        SharedModule,
        TranslocoModule,
        ValidationMessagesModule,

        // Fuse
        FuseConfirmationModule,

        // Material
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,

        // @Aurora
        DatepickerModule,
        DecimalModule,
    ],
    declarations: [
        KitchenSinkComponent,
        DecimalsComponent,
        GridComponent,
    ],
    providers: [
        {
            provide : TRANSLOCO_SCOPE,
            useValue: 'kitchen-sink',
            multi   : true,
        },
        {
            provide : MAT_DATE_LOCALE,
            useValue: 'es-ES',
        },
        {
            provide : DateAdapter,
            useClass: DatePickerDayjsAdapter,
            deps    : [MAT_DATE_LOCALE],
        },
        {
            provide : MAT_DATE_FORMATS,
            useValue: DatePickerDayjsFormats,
        },
    ],
})
export class KitchenSinkModule
{
    constructor(
        fuseNavigationService: FuseNavigationService,
        navigationService: NavigationService,
    )
    {
        const navComponent = fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');

        if (navComponent)
        {
            const applicationsMenu = fuseNavigationService.getItem('applications', navComponent.navigation);
            applicationsMenu.children.push(kitchenSink);
            navComponent.refresh();
        }
        else
        {
            navigationService
                .navigation$
                .pipe(first())
                .subscribe((navigation: Navigation) =>
                {
                    const applicationsMenu = fuseNavigationService.getItem('applications', navigation.default);
                    applicationsMenu.children.push(kitchenSink);
                });
        }
    }
}
