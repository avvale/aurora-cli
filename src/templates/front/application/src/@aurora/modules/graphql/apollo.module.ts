import { NgModule } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ApolloModule as OriginApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { apolloFactory } from './apollo.factory';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from '../auth/auth.service';

@NgModule({
    imports: [
        OriginApolloModule,
    ],
    providers: [
        {
            provide   : APOLLO_OPTIONS,
            useFactory: apolloFactory,
            deps      : [
                HttpLink,
                AuthService,
                FuseConfirmationService,
                TranslocoService,
            ],
        },
    ],
})
export class ApolloModule
{
}
