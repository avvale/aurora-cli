import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// modules
import { CoreModule } from '@aurora/core.module';
import { RootModule, ServerStaticModule } from '@aurora/modules';
import { GraphQLAIModule } from '@api/graphql-ai/graphql-ai.module';
import { SupportModule } from '@api/support/support.module';

@Module({
    imports: [
        RootModule,
        CoreModule,
        ServerStaticModule,
        GraphQLAIModule,
        SupportModule
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
    ],
})
export class AppModule {}
