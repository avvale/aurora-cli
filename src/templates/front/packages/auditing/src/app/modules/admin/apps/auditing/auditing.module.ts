import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { ValidationMessagesModule } from '@aurora';
import { SharedModule } from 'app/shared/shared.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

//
import { auditingRoutes } from './auditing.routing';
import { AuditingComponent } from './auditing.component';
import { SideEffectListComponent } from './side-effect/side-effect-list.component';
import { SideEffectDetailComponent } from './side-effect/side-effect-detail.component';
import { HttpCommunicationListComponent } from './http-communication/http-communication-list.component';
import { HttpCommunicationDetailComponent } from './http-communication/http-communication-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild(auditingRoutes),
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
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTooltipModule,

        // Third party
        NgxJsonViewerModule,
    ],
    declarations: [
        AuditingComponent,
        SideEffectDetailComponent,
        SideEffectListComponent,
        HttpCommunicationDetailComponent,
        HttpCommunicationListComponent
    ],
    providers: [
        {
            provide : TRANSLOCO_SCOPE,
            useValue: 'auditing',
            multi   : true,
        },
    ],
})
export class AuditingModule
{
}
