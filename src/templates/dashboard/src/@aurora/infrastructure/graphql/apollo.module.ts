import { NgModule } from '@angular/core';
import { ApolloService } from './apollo.service';
import { APOLLO_OPTIONS } from 'apollo-angular';

@NgModule({
    imports  : [],
    providers: [
        ApolloService,
        {
            provide   : APOLLO_OPTIONS,
            useFactory: (
                apolloService: ApolloService,
            ) =>
            {
                return apolloService.liveApolloFactory();
            },
            deps: [
                ApolloService,
            ],
        },
    ],
})
export class ApolloModule {}
