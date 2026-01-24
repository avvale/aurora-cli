// export DTOs
export { SupportCreateIssueDto } from './dto/support-create-issue.dto';
export { SupportIssueDto } from './dto/support-issue.dto';
export { SupportUpdateIssueByIdDto } from './dto/support-update-issue-by-id.dto';
export { SupportUpdateIssuesDto } from './dto/support-update-issues.dto';

// export handlers
export { SupportCreateIssueHandler } from './handlers/support-create-issue.handler';
export { SupportDeleteIssueByIdHandler } from './handlers/support-delete-issue-by-id.handler';
export { SupportFindIssueByIdHandler } from './handlers/support-find-issue-by-id.handler';
export { SupportFindIssueHandler } from './handlers/support-find-issue.handler';
export { SupportGetIssuesHandler } from './handlers/support-get-issues.handler';
export { SupportPaginateIssuesHandler } from './handlers/support-paginate-issues.handler';
export { SupportUpdateIssueByIdHandler } from './handlers/support-update-issue-by-id.handler';
export { SupportUpdateIssuesHandler } from './handlers/support-update-issues.handler';

// export controllers
export { SupportCreateIssueController } from './controllers/support-create-issue.controller';
export { SupportDeleteIssueByIdController } from './controllers/support-delete-issue-by-id.controller';
export { SupportFindIssueByIdController } from './controllers/support-find-issue-by-id.controller';
export { SupportFindIssueController } from './controllers/support-find-issue.controller';
export { SupportGetIssuesController } from './controllers/support-get-issues.controller';
export { SupportPaginateIssuesController } from './controllers/support-paginate-issues.controller';
export { SupportUpdateIssueByIdController } from './controllers/support-update-issue-by-id.controller';
export { SupportUpdateIssuesController } from './controllers/support-update-issues.controller';

// export resolvers
export { SupportCreateIssueResolver } from './resolvers/support-create-issue.resolver';
export { SupportDeleteIssueByIdResolver } from './resolvers/support-delete-issue-by-id.resolver';
export { SupportFindIssueByIdResolver } from './resolvers/support-find-issue-by-id.resolver';
export { SupportFindIssueResolver } from './resolvers/support-find-issue.resolver';
export { SupportGetIssuesResolver } from './resolvers/support-get-issues.resolver';
export { SupportPaginateIssuesResolver } from './resolvers/support-paginate-issues.resolver';
export { SupportUpdateIssueByIdResolver } from './resolvers/support-update-issue-by-id.resolver';
export { SupportUpdateIssuesResolver } from './resolvers/support-update-issues.resolver';

// export additionalApis
export { SupportCreateWebhookConfigController } from './controllers/support-create-webhook-config.controller';
export { SupportDeleteWebhookConfigController } from './controllers/support-delete-webhook-config.controller';
export { SupportCreateWebhookConfigHandler } from './handlers/support-create-webhook-config.handler';
export { SupportDeleteWebhookConfigHandler } from './handlers/support-delete-webhook-config.handler';
export { SupportCreateWebhookConfigResolver } from './resolvers/support-create-webhook-config.resolver';
export { SupportDeleteWebhookConfigResolver } from './resolvers/support-delete-webhook-config.resolver';

// import controllers
import { SupportCreateIssueController } from './controllers/support-create-issue.controller';
import { SupportDeleteIssueByIdController } from './controllers/support-delete-issue-by-id.controller';
import { SupportFindIssueByIdController } from './controllers/support-find-issue-by-id.controller';
import { SupportFindIssueController } from './controllers/support-find-issue.controller';
import { SupportGetIssuesController } from './controllers/support-get-issues.controller';
import { SupportPaginateIssuesController } from './controllers/support-paginate-issues.controller';
import { SupportUpdateIssueByIdController } from './controllers/support-update-issue-by-id.controller';
import { SupportUpdateIssuesController } from './controllers/support-update-issues.controller';

// import resolvers
import { SupportCreateIssueResolver } from './resolvers/support-create-issue.resolver';
import { SupportDeleteIssueByIdResolver } from './resolvers/support-delete-issue-by-id.resolver';
import { SupportFindIssueByIdResolver } from './resolvers/support-find-issue-by-id.resolver';
import { SupportFindIssueResolver } from './resolvers/support-find-issue.resolver';
import { SupportGetIssuesResolver } from './resolvers/support-get-issues.resolver';
import { SupportPaginateIssuesResolver } from './resolvers/support-paginate-issues.resolver';
import { SupportUpdateIssueByIdResolver } from './resolvers/support-update-issue-by-id.resolver';
import { SupportUpdateIssuesResolver } from './resolvers/support-update-issues.resolver';

// import handlers
import { SupportCreateIssueHandler } from './handlers/support-create-issue.handler';
import { SupportDeleteIssueByIdHandler } from './handlers/support-delete-issue-by-id.handler';
import { SupportFindIssueByIdHandler } from './handlers/support-find-issue-by-id.handler';
import { SupportFindIssueHandler } from './handlers/support-find-issue.handler';
import { SupportGetIssuesHandler } from './handlers/support-get-issues.handler';
import { SupportPaginateIssuesHandler } from './handlers/support-paginate-issues.handler';
import { SupportUpdateIssueByIdHandler } from './handlers/support-update-issue-by-id.handler';
import { SupportUpdateIssuesHandler } from './handlers/support-update-issues.handler';

// import seeder
import { SupportIssueSeeder } from './seeder/support-issue.seeder';

// import additionalApis
import { SupportCreateWebhookConfigController } from './controllers/support-create-webhook-config.controller';
import { SupportDeleteWebhookConfigController } from './controllers/support-delete-webhook-config.controller';
import { SupportCreateWebhookConfigHandler } from './handlers/support-create-webhook-config.handler';
import { SupportDeleteWebhookConfigHandler } from './handlers/support-delete-webhook-config.handler';
import { SupportCreateWebhookConfigResolver } from './resolvers/support-create-webhook-config.resolver';
import { SupportDeleteWebhookConfigResolver } from './resolvers/support-delete-webhook-config.resolver';

export const SupportIssueApiControllers = [
  SupportCreateIssueController,
  SupportPaginateIssuesController,
  SupportGetIssuesController,
  SupportFindIssueByIdController,
  SupportFindIssueController,
  SupportUpdateIssueByIdController,
  SupportUpdateIssuesController,
  SupportDeleteIssueByIdController,

  // additionalApis
  SupportCreateWebhookConfigController,
  SupportDeleteWebhookConfigController,
];

export const SupportIssueApiResolvers = [
  SupportCreateIssueResolver,
  SupportPaginateIssuesResolver,
  SupportGetIssuesResolver,
  SupportFindIssueByIdResolver,
  SupportFindIssueResolver,
  SupportUpdateIssueByIdResolver,
  SupportUpdateIssuesResolver,
  SupportDeleteIssueByIdResolver,

  // additionalApis
  SupportCreateWebhookConfigResolver,
  SupportDeleteWebhookConfigResolver,
];

export const SupportIssueApiHandlers = [
  SupportCreateIssueHandler,
  SupportPaginateIssuesHandler,
  SupportGetIssuesHandler,
  SupportFindIssueByIdHandler,
  SupportFindIssueHandler,
  SupportUpdateIssueByIdHandler,
  SupportUpdateIssuesHandler,
  SupportDeleteIssueByIdHandler,

  // additionalApis
  SupportCreateWebhookConfigHandler,
  SupportDeleteWebhookConfigHandler,
];

export const SupportIssueApiServices = [SupportIssueSeeder];
