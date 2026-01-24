import {
  SupportHandlers,
  SupportModels,
  SupportRepositories,
  SupportSagas,
  SupportServices,
} from '@app/support';
import { SharedModule } from '@aurora/shared.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  SupportClickupApiControllers,
  SupportClickupApiHandlers,
  SupportClickupApiResolvers,
  SupportClickupApiServices,
} from './clickup';
import {
  SupportCommentApiControllers,
  SupportCommentApiHandlers,
  SupportCommentApiResolvers,
  SupportCommentApiServices,
} from './comment';
import {
  SupportIssueApiControllers,
  SupportIssueApiHandlers,
  SupportIssueApiResolvers,
  SupportIssueApiServices,
} from './issue';
import { SupportDigestedWebhookEventHandler } from './shared';
import { SupportSeeder } from './support.seeder';

@Module({
  imports: [SharedModule, SequelizeModule.forFeature([...SupportModels])],
  controllers: [
    ...SupportIssueApiControllers,
    ...SupportClickupApiControllers,
    ...SupportCommentApiControllers,
  ],
  providers: [
    SupportSeeder,
    ...SupportHandlers,
    ...SupportServices,
    ...SupportRepositories,
    ...SupportSagas,
    ...SupportIssueApiResolvers,
    ...SupportIssueApiHandlers,
    ...SupportIssueApiServices,
    ...SupportClickupApiResolvers,
    ...SupportClickupApiHandlers,
    ...SupportClickupApiServices,
    ...SupportCommentApiResolvers,
    ...SupportCommentApiHandlers,
    ...SupportCommentApiServices,

    /* #region customizations */
    SupportDigestedWebhookEventHandler,
    /* #endregion customizations */
  ],
})
export class SupportModule {}
