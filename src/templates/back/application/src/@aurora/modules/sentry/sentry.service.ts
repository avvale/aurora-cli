import { Inject, Injectable } from '@nestjs/common';
import type { CaptureContext, CheckIn } from '@sentry/core';
import * as Sentry from '@sentry/node';
import { MODULE_OPTIONS_TOKEN } from './sentry.module-definition';
import { SentryLevel, SentryOptions } from './sentry.types';

@Injectable()
export class SentryService {
  isActive: boolean = true;

  get sentry(): typeof Sentry {
    return Sentry;
  }

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private sentryOptions: SentryOptions,
  ) {
    if (!this.isActive) return;

    Sentry.init({
      dsn: sentryOptions.dsn,

      // We recommend adjusting this value in production, or using tracesSampler
      // for finer control
      tracesSampleRate: 1.0,

      // set current release in sentry
      release: sentryOptions.release,

      // add database integration
      // TODO, integra sentry
      /* integrations: [
                ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
            ], */
    });
  }

  message(
    message: string,
    captureContext?: CaptureContext | SentryLevel,
  ): void {
    if (!this.isActive) return;

    Sentry.captureMessage(message, captureContext);
  }

  trackException(error: Error): void {
    if (!this.isActive) return;

    Sentry.captureException(error);
  }

  addBreadcrumb(breadcrumb: Sentry.Breadcrumb): void {
    Sentry.addBreadcrumb(breadcrumb);
  }

  scope(callback: (scope: Sentry.Scope) => void): void {
    Sentry.withScope(callback);
  }

  captureCheckIn(checkIn: CheckIn): string {
    return Sentry.captureCheckIn(checkIn);
  }
}
