import { Routes } from '@angular/router';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { SettingsComponent } from 'app/modules/admin/apps/settings/settings.component';
import { accountEditResolver } from './account/account.resolvers';
import { SettingsAccountComponent } from './account/account.component';
import { SettingsSecurityComponent } from './security/security.component';
import { securityEditResolver } from './security/security.resolvers';

export default [
    {
        path     : '',
        component: SettingsComponent,
        children : [
            { path: 'account', component: SettingsAccountComponent, resolve: { data: accountEditResolver }, data: { permission: 'iam.tenant.get' }},
            { path: 'security', component: SettingsSecurityComponent, resolve: { data: securityEditResolver }, data: { permission: 'iam.tenant.get' }},
            { path: '', redirectTo: 'account', pathMatch: 'full' },
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'settings',
                multi   : true,
            },
        ],
    },
] as Routes;
