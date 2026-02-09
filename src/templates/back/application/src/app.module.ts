import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// modules
import { BusinessPartnerPortalModule } from '@api/business-partner-portal/business-partner-portal.module';
import { CoreModule } from '@aurora/core.module';
import { RootModule, ServerStaticModule } from '@aurora/modules';

@Module({
  imports: [
    RootModule,
    CoreModule,
    ServerStaticModule,
    BusinessPartnerPortalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
