import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { ValidationMessagesModule } from '@aurora';
import { SharedModule } from 'app/shared/shared.module';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//
import { iamRoutes } from './iam.routing';
import { IamComponent } from './iam.component';
import { RoleListComponent } from './role/role-list.component';
import { RoleDetailComponent } from './role/role-detail.component';
import { BoundedContextListComponent } from './bounded-context/bounded-context-list.component';
import { BoundedContextDetailComponent } from './bounded-context/bounded-context-detail.component';
import { AccountListComponent } from './account/account-list.component';
import { AccountDetailComponent } from './account/account-detail.component';
import { TenantListComponent } from './tenant/tenant-list.component';
import { TenantDetailComponent } from './tenant/tenant-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild(iamRoutes),
        SharedModule,
        TranslocoModule,
        ValidationMessagesModule,
        MatPasswordStrengthModule.forRoot(),

        // Fuse
        FuseConfirmationModule,

        // Material
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
    ],
    declarations: [
        IamComponent,
        AccountDetailComponent,
        AccountListComponent,
        BoundedContextDetailComponent,
        BoundedContextListComponent,
        RoleDetailComponent,
        RoleListComponent,
        TenantDetailComponent,
        TenantListComponent,
    ],
    providers: [
        {
            provide : TRANSLOCO_SCOPE,
            useValue: 'iam',
            multi   : true,
        },
    ],
})
export class IamModule
{
}
