import { NgModule } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ApolloModule as OriginApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { apolloFactory } from './apollo.factory';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthenticationService } from '../authentication/authentication.service';

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
                AuthenticationService,
                FuseConfirmationService,
                TranslocoService,
            ],
        },
    ],
})
export class ApolloModule
{
}
