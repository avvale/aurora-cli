import { ConfigurableModuleBuilder } from '@nestjs/common';
import { SentryOptions } from './sentry.types';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<SentryOptions>().setClassMethodName('forRoot').build();
