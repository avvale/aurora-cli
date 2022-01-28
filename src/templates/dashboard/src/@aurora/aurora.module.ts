import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { ApolloModule, BootstrapService, PipesModule } from './infrastructure';

@NgModule({
    imports: [
        ApolloModule,
        PipesModule,
    ],
    providers: [
        {
            provide   : APP_INITIALIZER,
            useFactory: (bootstrapService: BootstrapService): () => void => () => bootstrapService.init(),
            deps      : [BootstrapService],
            multi     : true,
        },
    ],
})
export class AuroraModule
{
    /**
     * Constructor
     */
    constructor(
        @Optional() @SkipSelf() parentModule?: AuroraModule,
    )
    {
        if ( parentModule )
        {
            throw new Error('AuroraModule has already been loaded. Import this module in the AppModule only!');
        }
    }
}