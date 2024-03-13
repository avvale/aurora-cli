import { Module } from '@nestjs/common';
import { SentryService } from './sentry.service';
import { ConfigurableModuleClass } from './sentry.module-definition';

@Module({
    providers: [SentryService],
    exports  : [SentryService],
})
export class SentryModule extends ConfigurableModuleClass { }