import { Module } from '@nestjs/common';
import { CoreEnvironmentInformationController, CorePreparationRequestController, CoreStatusController, SequelizeConfigModule } from '@aurora-ts/core';
import { SharedModule } from './shared.module';
import { GraphQLConfigModule } from './graphql/graphql-config.module';
import { BootstrapService } from './services/bootstrap.service';
import { MailerCLientModule } from './mailer/mailer-client.module';

@Module({
    imports: [
        GraphQLConfigModule,
        MailerCLientModule,
        SequelizeConfigModule,
        SharedModule,
    ],
    controllers: [
        CoreEnvironmentInformationController,
        CorePreparationRequestController,
        CoreStatusController,
    ],
    providers: [
        BootstrapService,
    ],
})
export class CoreModule {}