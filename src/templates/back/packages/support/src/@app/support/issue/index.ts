// export commands
export { SupportCreateIssueCommand } from './application/create/support-create-issue.command';
export { SupportDeleteIssueByIdCommand } from './application/delete/support-delete-issue-by-id.command';
export { SupportUpdateIssueByIdCommand } from './application/update/support-update-issue-by-id.command';
export { SupportUpdateIssuesCommand } from './application/update/support-update-issues.command';

// export queries
export { SupportFindIssueByIdQuery } from './application/find/support-find-issue-by-id.query';
export { SupportFindIssueQuery } from './application/find/support-find-issue.query';
export { SupportGetIssuesQuery } from './application/get/support-get-issues.query';
export { SupportPaginateIssuesQuery } from './application/paginate/support-paginate-issues.query';

// export mocks
export { supportMockIssueData } from './infrastructure/mock/support-mock-issue.data';
export { SupportMockIssueRepository } from './infrastructure/mock/support-mock-issue.repository';
export { SupportMockIssueSeeder } from './infrastructure/mock/support-mock-issue.seeder';

// export events
export { SupportAddIssuesContextEvent } from './application/events/support-add-issues-context.event';
export { SupportCreatedIssueEvent } from './application/events/support-created-issue.event';
export { SupportCreatedIssuesEvent } from './application/events/support-created-issues.event';
export { SupportDeletedIssueEvent } from './application/events/support-deleted-issue.event';
export { SupportUpdatedIssueEvent } from './application/events/support-updated-issue.event';
export { SupportUpdatedIssuesEvent } from './application/events/support-updated-issues.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { SupportIssue } from './domain/support-issue.aggregate';
export { SupportIssueMapper } from './domain/support-issue.mapper';
export { SupportIIssueRepository } from './domain/support-issue.repository';
export { SupportIssueResponse } from './domain/support-issue.response';

// infrastructure
export { SupportIssueModel } from './infrastructure/sequelize/support-sequelize-issue.model';
export { SupportSequelizeIssueRepository } from './infrastructure/sequelize/support-sequelize-issue.repository';

// sagas
export { SupportIssueSagas } from './application/sagas/support-issue.sagas';

// command handlers
import { SupportCreateIssueCommandHandler } from './application/create/support-create-issue.command-handler';
import { SupportDeleteIssueByIdCommandHandler } from './application/delete/support-delete-issue-by-id.command-handler';
import { SupportUpdateIssueByIdCommandHandler } from './application/update/support-update-issue-by-id.command-handler';
import { SupportUpdateIssuesCommandHandler } from './application/update/support-update-issues.command-handler';

// query handlers
import { SupportFindIssueByIdQueryHandler } from './application/find/support-find-issue-by-id.query-handler';
import { SupportFindIssueQueryHandler } from './application/find/support-find-issue.query-handler';
import { SupportGetIssuesQueryHandler } from './application/get/support-get-issues.query-handler';
import { SupportPaginateIssuesQueryHandler } from './application/paginate/support-paginate-issues.query-handler';

// event handlers
import { SupportCreatedIssueEventHandler } from './application/events/support-created-issue.event-handler';
import { SupportCreatedIssuesEventHandler } from './application/events/support-created-issues.event-handler';
import { SupportDeletedIssueEventHandler } from './application/events/support-deleted-issue.event-handler';
import { SupportUpdatedIssueEventHandler } from './application/events/support-updated-issue.event-handler';
import { SupportUpdatedIssuesEventHandler } from './application/events/support-updated-issues.event-handler';

// services
import { SupportCreateIssueService } from './application/create/support-create-issue.service';
import { SupportDeleteIssueByIdService } from './application/delete/support-delete-issue-by-id.service';
import { SupportFindIssueByIdService } from './application/find/support-find-issue-by-id.service';
import { SupportFindIssueService } from './application/find/support-find-issue.service';
import { SupportGetIssuesService } from './application/get/support-get-issues.service';
import { SupportPaginateIssuesService } from './application/paginate/support-paginate-issues.service';
import { SupportUpdateIssueByIdService } from './application/update/support-update-issue-by-id.service';
import { SupportUpdateIssuesService } from './application/update/support-update-issues.service';

export const SupportIssueHandlers = [
    // commands
    SupportCreateIssueCommandHandler,
    SupportUpdateIssueByIdCommandHandler,
    SupportUpdateIssuesCommandHandler,
    SupportDeleteIssueByIdCommandHandler,

    // queries
    SupportPaginateIssuesQueryHandler,
    SupportGetIssuesQueryHandler,
    SupportFindIssueQueryHandler,
    SupportFindIssueByIdQueryHandler,

    // events
    SupportCreatedIssueEventHandler,
    SupportCreatedIssuesEventHandler,
    SupportUpdatedIssueEventHandler,
    SupportUpdatedIssuesEventHandler,
    SupportDeletedIssueEventHandler,
];

export const SupportIssueServices = [
    SupportCreateIssueService,
    SupportPaginateIssuesService,
    SupportGetIssuesService,
    SupportFindIssueService,
    SupportFindIssueByIdService,
    SupportUpdateIssueByIdService,
    SupportUpdateIssuesService,
    SupportDeleteIssueByIdService,
];
