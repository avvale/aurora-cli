import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { DatePickerDayjsAdapter, DatePickerDayjsFormats, ValidationMessagesModule } from '@aurora';
import { SharedModule } from 'app/shared/shared.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

// Material
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//
import { queueManagerRoutes } from './queue-manager.routing';
import { QueueManagerComponent } from './queue-manager.component';
import { QueueListComponent } from './queue/queue-list.component';
import { QueueDetailComponent } from './queue/queue-detail.component';
import { JobRegistryListComponent } from './job-registry/job-registry-list.component';
import { JobRegistryDetailComponent } from './job-registry/job-registry-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild(queueManagerRoutes),
        SharedModule,
        TranslocoModule,
        ValidationMessagesModule,

        // Fuse
        FuseConfirmationModule,

        // Material
        MatBadgeModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSnackBarModule,

        // Third party
        NgxJsonViewerModule,
    ],
    declarations: [
        QueueManagerComponent,
        QueueDetailComponent,
        QueueListComponent,
        JobRegistryDetailComponent,
        JobRegistryListComponent
    ],
    providers: [
        {
            provide : TRANSLOCO_SCOPE,
            useValue: 'queue-manager',
            multi   : true,
        },
        {
            provide : TRANSLOCO_SCOPE,
            useValue: 'error',
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
export class QueueManagerModule
{
}
