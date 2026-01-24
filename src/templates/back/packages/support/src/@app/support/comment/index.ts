// export commands
export { SupportCreateCommentCommand } from './application/create/support-create-comment.command';
export { SupportDeleteCommentByIdCommand } from './application/delete/support-delete-comment-by-id.command';
export { SupportDeleteCommentsCommand } from './application/delete/support-delete-comments.command';
export { SupportUpdateCommentByIdCommand } from './application/update/support-update-comment-by-id.command';
export { SupportUpdateCommentsCommand } from './application/update/support-update-comments.command';

// export queries
export { SupportFindCommentByIdQuery } from './application/find/support-find-comment-by-id.query';
export { SupportFindCommentQuery } from './application/find/support-find-comment.query';
export { SupportGetCommentsQuery } from './application/get/support-get-comments.query';
export { SupportPaginateCommentsQuery } from './application/paginate/support-paginate-comments.query';

// export mocks
export { supportMockCommentData } from './infrastructure/mock/support-mock-comment.data';
export { SupportMockCommentRepository } from './infrastructure/mock/support-mock-comment.repository';
export { SupportMockCommentSeeder } from './infrastructure/mock/support-mock-comment.seeder';

// export events
export { SupportAddCommentsContextEvent } from './application/events/support-add-comments-context.event';
export { SupportCreatedCommentEvent } from './application/events/support-created-comment.event';
export { SupportCreatedCommentsEvent } from './application/events/support-created-comments.event';
export { SupportDeletedCommentEvent } from './application/events/support-deleted-comment.event';
export { SupportDeletedCommentsEvent } from './application/events/support-deleted-comments.event';
export { SupportUpdatedCommentEvent } from './application/events/support-updated-comment.event';
export { SupportUpdatedCommentsEvent } from './application/events/support-updated-comments.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { SupportComment } from './domain/support-comment.aggregate';
export { SupportCommentMapper } from './domain/support-comment.mapper';
export { SupportICommentRepository } from './domain/support-comment.repository';
export { SupportCommentResponse } from './domain/support-comment.response';

// infrastructure
export { SupportCommentModel } from './infrastructure/sequelize/support-sequelize-comment.model';
export { SupportSequelizeCommentRepository } from './infrastructure/sequelize/support-sequelize-comment.repository';

// sagas
export { SupportCommentSagas } from './application/sagas/support-comment.sagas';

// command handlers
import { SupportCreateCommentCommandHandler } from './application/create/support-create-comment.command-handler';
import { SupportDeleteCommentByIdCommandHandler } from './application/delete/support-delete-comment-by-id.command-handler';
import { SupportDeleteCommentsCommandHandler } from './application/delete/support-delete-comments.command-handler';
import { SupportUpdateCommentByIdCommandHandler } from './application/update/support-update-comment-by-id.command-handler';
import { SupportUpdateCommentsCommandHandler } from './application/update/support-update-comments.command-handler';

// query handlers
import { SupportFindCommentByIdQueryHandler } from './application/find/support-find-comment-by-id.query-handler';
import { SupportFindCommentQueryHandler } from './application/find/support-find-comment.query-handler';
import { SupportGetCommentsQueryHandler } from './application/get/support-get-comments.query-handler';
import { SupportPaginateCommentsQueryHandler } from './application/paginate/support-paginate-comments.query-handler';

// event handlers
import { SupportCreatedCommentEventHandler } from './application/events/support-created-comment.event-handler';
import { SupportCreatedCommentsEventHandler } from './application/events/support-created-comments.event-handler';
import { SupportDeletedCommentEventHandler } from './application/events/support-deleted-comment.event-handler';
import { SupportDeletedCommentsEventHandler } from './application/events/support-deleted-comments.event-handler';
import { SupportUpdatedCommentEventHandler } from './application/events/support-updated-comment.event-handler';
import { SupportUpdatedCommentsEventHandler } from './application/events/support-updated-comments.event-handler';

// services
import { SupportCreateCommentService } from './application/create/support-create-comment.service';
import { SupportDeleteCommentByIdService } from './application/delete/support-delete-comment-by-id.service';
import { SupportDeleteCommentsService } from './application/delete/support-delete-comments.service';
import { SupportFindCommentByIdService } from './application/find/support-find-comment-by-id.service';
import { SupportFindCommentService } from './application/find/support-find-comment.service';
import { SupportGetCommentsService } from './application/get/support-get-comments.service';
import { SupportPaginateCommentsService } from './application/paginate/support-paginate-comments.service';
import { SupportUpdateCommentByIdService } from './application/update/support-update-comment-by-id.service';
import { SupportUpdateCommentsService } from './application/update/support-update-comments.service';

export const SupportCommentHandlers = [
  // commands
  SupportCreateCommentCommandHandler,
  SupportUpdateCommentByIdCommandHandler,
  SupportUpdateCommentsCommandHandler,
  SupportDeleteCommentByIdCommandHandler,
  SupportDeleteCommentsCommandHandler,

  // queries
  SupportPaginateCommentsQueryHandler,
  SupportGetCommentsQueryHandler,
  SupportFindCommentQueryHandler,
  SupportFindCommentByIdQueryHandler,

  // events
  SupportCreatedCommentEventHandler,
  SupportCreatedCommentsEventHandler,
  SupportUpdatedCommentEventHandler,
  SupportUpdatedCommentsEventHandler,
  SupportDeletedCommentEventHandler,
  SupportDeletedCommentsEventHandler,
];

export const SupportCommentServices = [
  SupportCreateCommentService,
  SupportPaginateCommentsService,
  SupportGetCommentsService,
  SupportFindCommentService,
  SupportFindCommentByIdService,
  SupportUpdateCommentByIdService,
  SupportUpdateCommentsService,
  SupportDeleteCommentByIdService,
  SupportDeleteCommentsService,
];
