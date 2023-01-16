import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { ApolloModule } from './modules';
import { BootstrapService } from './services/bootstrap.service';
import { PipesModule } from './pipes';
import './prototypes/string-to-camel-case.interface';
import './prototypes/string-to-camel-case';
import './prototypes/string-to-kebab-case.interface';
import './prototypes/string-to-kebab-case';
import './prototypes/string-to-pascal-case.interface';
import './prototypes/string-to-pascal-case';
import './prototypes/string-to-snake-case.interface';
import './prototypes/string-to-snake-case';

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