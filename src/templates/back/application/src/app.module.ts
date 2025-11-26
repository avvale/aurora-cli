import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// modules
import { SupportModule } from '@api/support/support.module';
import { CoreModule } from '@aurora/core.module';
import { RootModule, ServerStaticModule } from '@aurora/modules';

@Module({
    imports: [
        RootModule,
        CoreModule,
        ServerStaticModule,
        // McpModule,
        // GraphQLAIModule,
        SupportModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
