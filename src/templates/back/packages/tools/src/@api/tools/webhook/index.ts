// export DTOs
export { ToolsCreateWebhookDto } from './dto/tools-create-webhook.dto';
export { ToolsUpdateWebhookByIdDto } from './dto/tools-update-webhook-by-id.dto';
export { ToolsUpdateWebhooksDto } from './dto/tools-update-webhooks.dto';
export { ToolsWebhookDto } from './dto/tools-webhook.dto';

// export handlers
export { ToolsCreateWebhookHandler } from './handlers/tools-create-webhook.handler';
export { ToolsCreateWebhooksHandler } from './handlers/tools-create-webhooks.handler';
export { ToolsDeleteWebhookByIdHandler } from './handlers/tools-delete-webhook-by-id.handler';
export { ToolsDeleteWebhooksHandler } from './handlers/tools-delete-webhooks.handler';
export { ToolsFindWebhookByIdHandler } from './handlers/tools-find-webhook-by-id.handler';
export { ToolsFindWebhookHandler } from './handlers/tools-find-webhook.handler';
export { ToolsGetWebhooksHandler } from './handlers/tools-get-webhooks.handler';
export { ToolsPaginateWebhooksHandler } from './handlers/tools-paginate-webhooks.handler';
export { ToolsUpdateWebhookByIdHandler } from './handlers/tools-update-webhook-by-id.handler';

// export controllers
export { ToolsCreateWebhookController } from './controllers/tools-create-webhook.controller';
export { ToolsCreateWebhooksController } from './controllers/tools-create-webhooks.controller';
export { ToolsDeleteWebhookByIdController } from './controllers/tools-delete-webhook-by-id.controller';
export { ToolsDeleteWebhooksController } from './controllers/tools-delete-webhooks.controller';
export { ToolsFindWebhookByIdController } from './controllers/tools-find-webhook-by-id.controller';
export { ToolsFindWebhookController } from './controllers/tools-find-webhook.controller';
export { ToolsGetWebhooksController } from './controllers/tools-get-webhooks.controller';
export { ToolsPaginateWebhooksController } from './controllers/tools-paginate-webhooks.controller';
export { ToolsUpdateWebhookByIdController } from './controllers/tools-update-webhook-by-id.controller';

// export resolvers
export { ToolsCreateWebhookResolver } from './resolvers/tools-create-webhook.resolver';
export { ToolsCreateWebhooksResolver } from './resolvers/tools-create-webhooks.resolver';
export { ToolsDeleteWebhookByIdResolver } from './resolvers/tools-delete-webhook-by-id.resolver';
export { ToolsDeleteWebhooksResolver } from './resolvers/tools-delete-webhooks.resolver';
export { ToolsFindWebhookByIdResolver } from './resolvers/tools-find-webhook-by-id.resolver';
export { ToolsFindWebhookResolver } from './resolvers/tools-find-webhook.resolver';
export { ToolsGetWebhooksResolver } from './resolvers/tools-get-webhooks.resolver';
export { ToolsPaginateWebhooksResolver } from './resolvers/tools-paginate-webhooks.resolver';
export { ToolsUpdateWebhookByIdResolver } from './resolvers/tools-update-webhook-by-id.resolver';

// export additionalApis
export { ToolsDigestWebhookController } from './controllers/tools-digest-webhook.controller';
export { ToolsDigestWebhookHandler } from './handlers/tools-digest-webhook.handler';
export { ToolsDigestWebhookResolver } from './resolvers/tools-digest-webhook.resolver';

// import controllers
import { ToolsCreateWebhookController } from './controllers/tools-create-webhook.controller';
import { ToolsCreateWebhooksController } from './controllers/tools-create-webhooks.controller';
import { ToolsDeleteWebhookByIdController } from './controllers/tools-delete-webhook-by-id.controller';
import { ToolsDeleteWebhooksController } from './controllers/tools-delete-webhooks.controller';
import { ToolsFindWebhookByIdController } from './controllers/tools-find-webhook-by-id.controller';
import { ToolsFindWebhookController } from './controllers/tools-find-webhook.controller';
import { ToolsGetWebhooksController } from './controllers/tools-get-webhooks.controller';
import { ToolsPaginateWebhooksController } from './controllers/tools-paginate-webhooks.controller';
import { ToolsUpdateWebhookByIdController } from './controllers/tools-update-webhook-by-id.controller';

// import resolvers
import { ToolsCreateWebhookResolver } from './resolvers/tools-create-webhook.resolver';
import { ToolsCreateWebhooksResolver } from './resolvers/tools-create-webhooks.resolver';
import { ToolsDeleteWebhookByIdResolver } from './resolvers/tools-delete-webhook-by-id.resolver';
import { ToolsDeleteWebhooksResolver } from './resolvers/tools-delete-webhooks.resolver';
import { ToolsFindWebhookByIdResolver } from './resolvers/tools-find-webhook-by-id.resolver';
import { ToolsFindWebhookResolver } from './resolvers/tools-find-webhook.resolver';
import { ToolsGetWebhooksResolver } from './resolvers/tools-get-webhooks.resolver';
import { ToolsPaginateWebhooksResolver } from './resolvers/tools-paginate-webhooks.resolver';
import { ToolsUpdateWebhookByIdResolver } from './resolvers/tools-update-webhook-by-id.resolver';

// import handlers
import { ToolsCreateWebhookHandler } from './handlers/tools-create-webhook.handler';
import { ToolsCreateWebhooksHandler } from './handlers/tools-create-webhooks.handler';
import { ToolsDeleteWebhookByIdHandler } from './handlers/tools-delete-webhook-by-id.handler';
import { ToolsDeleteWebhooksHandler } from './handlers/tools-delete-webhooks.handler';
import { ToolsFindWebhookByIdHandler } from './handlers/tools-find-webhook-by-id.handler';
import { ToolsFindWebhookHandler } from './handlers/tools-find-webhook.handler';
import { ToolsGetWebhooksHandler } from './handlers/tools-get-webhooks.handler';
import { ToolsPaginateWebhooksHandler } from './handlers/tools-paginate-webhooks.handler';
import { ToolsUpdateWebhookByIdHandler } from './handlers/tools-update-webhook-by-id.handler';

// import seeder
import { ToolsWebhookSeeder } from './seeder/tools-webhook.seeder';

// import additionalApis
import { ToolsDigestWebhookController } from './controllers/tools-digest-webhook.controller';
import { ToolsDigestWebhookHandler } from './handlers/tools-digest-webhook.handler';
import { ToolsDigestWebhookResolver } from './resolvers/tools-digest-webhook.resolver';
import { ToolsWebhookKeyValueService } from './shared/tools-webhook-key-value.service';

export const ToolsWebhookApiControllers = [
    ToolsCreateWebhookController,
    ToolsCreateWebhooksController,
    ToolsPaginateWebhooksController,
    ToolsGetWebhooksController,
    ToolsFindWebhookByIdController,
    ToolsFindWebhookController,
    ToolsUpdateWebhookByIdController,
    ToolsDeleteWebhookByIdController,
    ToolsDeleteWebhooksController,

    // additionalApis
    ToolsDigestWebhookController,
];

export const ToolsWebhookApiResolvers = [
    ToolsCreateWebhookResolver,
    ToolsCreateWebhooksResolver,
    ToolsPaginateWebhooksResolver,
    ToolsGetWebhooksResolver,
    ToolsFindWebhookByIdResolver,
    ToolsFindWebhookResolver,
    ToolsUpdateWebhookByIdResolver,
    ToolsDeleteWebhookByIdResolver,
    ToolsDeleteWebhooksResolver,

    // additionalApis
    ToolsDigestWebhookResolver,
];

export const ToolsWebhookApiHandlers = [
    ToolsCreateWebhookHandler,
    ToolsCreateWebhooksHandler,
    ToolsPaginateWebhooksHandler,
    ToolsGetWebhooksHandler,
    ToolsFindWebhookByIdHandler,
    ToolsFindWebhookHandler,
    ToolsUpdateWebhookByIdHandler,
    ToolsDeleteWebhookByIdHandler,
    ToolsDeleteWebhooksHandler,

    // additionalApis
    ToolsDigestWebhookHandler,
];

export const ToolsWebhookApiServices = [
    ToolsWebhookSeeder,
    ToolsWebhookKeyValueService,
];
