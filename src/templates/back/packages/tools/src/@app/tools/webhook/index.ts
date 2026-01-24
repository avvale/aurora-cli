// export commands
export { ToolsCreateWebhookCommand } from './application/create/tools-create-webhook.command';
export { ToolsCreateWebhooksCommand } from './application/create/tools-create-webhooks.command';
export { ToolsDeleteWebhookByIdCommand } from './application/delete/tools-delete-webhook-by-id.command';
export { ToolsDeleteWebhooksCommand } from './application/delete/tools-delete-webhooks.command';
export { ToolsDigestWebhookCommand } from './application/digest/tools-digest-webhook.command';
export { ToolsUpdateWebhookByIdCommand } from './application/update/tools-update-webhook-by-id.command';

// export queries
export { ToolsFindWebhookByIdQuery } from './application/find/tools-find-webhook-by-id.query';
export { ToolsFindWebhookQuery } from './application/find/tools-find-webhook.query';
export { ToolsGetWebhooksQuery } from './application/get/tools-get-webhooks.query';
export { ToolsPaginateWebhooksQuery } from './application/paginate/tools-paginate-webhooks.query';

// export mocks
export { toolsMockWebhookData } from './infrastructure/mock/tools-mock-webhook.data';
export { ToolsMockWebhookRepository } from './infrastructure/mock/tools-mock-webhook.repository';
export { ToolsMockWebhookSeeder } from './infrastructure/mock/tools-mock-webhook.seeder';

// export events
export { ToolsAddWebhooksContextEvent } from './application/events/tools-add-webhooks-context.event';
export { ToolsCreatedWebhookEvent } from './application/events/tools-created-webhook.event';
export { ToolsCreatedWebhooksEvent } from './application/events/tools-created-webhooks.event';
export { ToolsDeletedWebhookEvent } from './application/events/tools-deleted-webhook.event';
export { ToolsDeletedWebhooksEvent } from './application/events/tools-deleted-webhooks.event';
export { ToolsDigestedWebhookEvent } from './application/events/tools-digested-webhook.event';
export { ToolsUpdatedWebhookEvent } from './application/events/tools-updated-webhook.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { ToolsWebhookPayload } from './domain/tools-webhook-payload.aggregate';
export { ToolsWebhook } from './domain/tools-webhook.aggregate';
export { ToolsWebhookMapper } from './domain/tools-webhook.mapper';
export { ToolsIWebhookRepository } from './domain/tools-webhook.repository';
export { ToolsWebhookResponse } from './domain/tools-webhook.response';

// infrastructure
export { ToolsWebhookModel } from './infrastructure/sequelize/tools-sequelize-webhook.model';
export { ToolsSequelizeWebhookRepository } from './infrastructure/sequelize/tools-sequelize-webhook.repository';

// sagas
export { ToolsWebhookSagas } from './application/sagas/tools-webhook.sagas';

// command handlers
import { ToolsCreateWebhookCommandHandler } from './application/create/tools-create-webhook.command-handler';
import { ToolsCreateWebhooksCommandHandler } from './application/create/tools-create-webhooks.command-handler';
import { ToolsDeleteWebhookByIdCommandHandler } from './application/delete/tools-delete-webhook-by-id.command-handler';
import { ToolsDeleteWebhooksCommandHandler } from './application/delete/tools-delete-webhooks.command-handler';
import { ToolsDigestWebhookCommandHandler } from './application/digest/tools-digest-webhook.command-handler';
import { ToolsUpdateWebhookByIdCommandHandler } from './application/update/tools-update-webhook-by-id.command-handler';

// query handlers
import { ToolsFindWebhookByIdQueryHandler } from './application/find/tools-find-webhook-by-id.query-handler';
import { ToolsFindWebhookQueryHandler } from './application/find/tools-find-webhook.query-handler';
import { ToolsGetWebhooksQueryHandler } from './application/get/tools-get-webhooks.query-handler';
import { ToolsPaginateWebhooksQueryHandler } from './application/paginate/tools-paginate-webhooks.query-handler';

// event handlers
import { ToolsCreatedWebhookEventHandler } from './application/events/tools-created-webhook.event-handler';
import { ToolsCreatedWebhooksEventHandler } from './application/events/tools-created-webhooks.event-handler';
import { ToolsDeletedWebhookEventHandler } from './application/events/tools-deleted-webhook.event-handler';
import { ToolsDeletedWebhooksEventHandler } from './application/events/tools-deleted-webhooks.event-handler';
import { ToolsDigestedWebhookEventHandler } from './application/events/tools-digested-webhook.event-handler';
import { ToolsUpdatedWebhookEventHandler } from './application/events/tools-updated-webhook.event-handler';

// services
import { ToolsCreateWebhookService } from './application/create/tools-create-webhook.service';
import { ToolsCreateWebhooksService } from './application/create/tools-create-webhooks.service';
import { ToolsDeleteWebhookByIdService } from './application/delete/tools-delete-webhook-by-id.service';
import { ToolsDeleteWebhooksService } from './application/delete/tools-delete-webhooks.service';
import { ToolsDigestWebhookService } from './application/digest/tools-digest-webhook.service';
import { ToolsFindWebhookByIdService } from './application/find/tools-find-webhook-by-id.service';
import { ToolsFindWebhookService } from './application/find/tools-find-webhook.service';
import { ToolsGetWebhooksService } from './application/get/tools-get-webhooks.service';
import { ToolsPaginateWebhooksService } from './application/paginate/tools-paginate-webhooks.service';
import { ToolsUpdateWebhookByIdService } from './application/update/tools-update-webhook-by-id.service';

export const ToolsWebhookHandlers = [
  // commands
  ToolsCreateWebhookCommandHandler,
  ToolsCreateWebhooksCommandHandler,
  ToolsUpdateWebhookByIdCommandHandler,
  ToolsDeleteWebhookByIdCommandHandler,
  ToolsDeleteWebhooksCommandHandler,
  ToolsDigestWebhookCommandHandler,

  // queries
  ToolsPaginateWebhooksQueryHandler,
  ToolsGetWebhooksQueryHandler,
  ToolsFindWebhookQueryHandler,
  ToolsFindWebhookByIdQueryHandler,

  // events
  ToolsCreatedWebhookEventHandler,
  ToolsCreatedWebhooksEventHandler,
  ToolsUpdatedWebhookEventHandler,
  ToolsDeletedWebhookEventHandler,
  ToolsDeletedWebhooksEventHandler,
  ToolsDigestedWebhookEventHandler,
];

export const ToolsWebhookServices = [
  ToolsCreateWebhookService,
  ToolsCreateWebhooksService,
  ToolsPaginateWebhooksService,
  ToolsGetWebhooksService,
  ToolsFindWebhookService,
  ToolsFindWebhookByIdService,
  ToolsUpdateWebhookByIdService,
  ToolsDeleteWebhookByIdService,
  ToolsDeleteWebhooksService,
  ToolsDigestWebhookService,
];
