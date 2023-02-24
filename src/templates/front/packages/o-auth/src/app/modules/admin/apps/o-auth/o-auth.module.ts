import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { ValidationMessagesModule } from '@aurora';
import { SharedModule } from 'app/shared/shared.module';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//
import { oAuthRoutes } from './o-auth.routing';
import { OAuthComponent } from './o-auth.component';
import { ScopeListComponent } from './scope/scope-list.component';
import { ScopeDetailComponent } from './scope/scope-detail.component';
import { ApplicationListComponent } from './application/application-list.component';
import { ApplicationDetailComponent } from './application/application-detail.component';
import { ClientListComponent } from './client/client-list.component';
import { ClientDetailComponent } from './client/client-detail.component';
import { AccessTokenListComponent } from './access-token/access-token-list.component';
import { AccessTokenDetailComponent } from './access-token/access-token-detail.component';
import { RefreshTokenListComponent } from './refresh-token/refresh-token-list.component';
import { RefreshTokenDetailComponent } from './refresh-token/refresh-token-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild(oAuthRoutes),
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
    ],
    declarations: [
        OAuthComponent,
        ScopeDetailComponent,
        ScopeListComponent,
        ApplicationDetailComponent,
        ApplicationListComponent,
        ClientDetailComponent,
        ClientListComponent,
        AccessTokenDetailComponent,
        AccessTokenListComponent,
        RefreshTokenDetailComponent,
        RefreshTokenListComponent
    ],
    providers: [
        {
            provide : TRANSLOCO_SCOPE,
            useValue: 'o-auth',
            multi   : true,
        },
    ],
})
export class OAuthModule
{
}
