import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './sentry.module-definition';
import { SentryService } from './sentry.service';

@Module({
  providers: [SentryService],
  exports: [SentryService],
})
export class SentryModule extends ConfigurableModuleClass {}
