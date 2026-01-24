// export DTOs
export { SupportCommentDto } from './dto/support-comment.dto';
export { SupportCreateCommentDto } from './dto/support-create-comment.dto';
export { SupportUpdateCommentByIdDto } from './dto/support-update-comment-by-id.dto';
export { SupportUpdateCommentsDto } from './dto/support-update-comments.dto';

// export handlers
export { SupportCreateCommentHandler } from './handlers/support-create-comment.handler';
export { SupportDeleteCommentByIdHandler } from './handlers/support-delete-comment-by-id.handler';
export { SupportDeleteCommentsHandler } from './handlers/support-delete-comments.handler';
export { SupportFindCommentByIdHandler } from './handlers/support-find-comment-by-id.handler';
export { SupportFindCommentHandler } from './handlers/support-find-comment.handler';
export { SupportGetCommentsHandler } from './handlers/support-get-comments.handler';
export { SupportPaginateCommentsHandler } from './handlers/support-paginate-comments.handler';
export { SupportUpdateCommentByIdHandler } from './handlers/support-update-comment-by-id.handler';
export { SupportUpdateCommentsHandler } from './handlers/support-update-comments.handler';

// export controllers
export { SupportCreateCommentController } from './controllers/support-create-comment.controller';
export { SupportDeleteCommentByIdController } from './controllers/support-delete-comment-by-id.controller';
export { SupportDeleteCommentsController } from './controllers/support-delete-comments.controller';
export { SupportFindCommentByIdController } from './controllers/support-find-comment-by-id.controller';
export { SupportFindCommentController } from './controllers/support-find-comment.controller';
export { SupportGetCommentsController } from './controllers/support-get-comments.controller';
export { SupportPaginateCommentsController } from './controllers/support-paginate-comments.controller';
export { SupportUpdateCommentByIdController } from './controllers/support-update-comment-by-id.controller';
export { SupportUpdateCommentsController } from './controllers/support-update-comments.controller';

// export resolvers
export { SupportCreateCommentResolver } from './resolvers/support-create-comment.resolver';
export { SupportDeleteCommentByIdResolver } from './resolvers/support-delete-comment-by-id.resolver';
export { SupportDeleteCommentsResolver } from './resolvers/support-delete-comments.resolver';
export { SupportFindCommentByIdResolver } from './resolvers/support-find-comment-by-id.resolver';
export { SupportFindCommentResolver } from './resolvers/support-find-comment.resolver';
export { SupportGetCommentsResolver } from './resolvers/support-get-comments.resolver';
export { SupportPaginateCommentsResolver } from './resolvers/support-paginate-comments.resolver';
export { SupportUpdateCommentByIdResolver } from './resolvers/support-update-comment-by-id.resolver';
export { SupportUpdateCommentsResolver } from './resolvers/support-update-comments.resolver';

// import controllers
import { SupportCreateCommentController } from './controllers/support-create-comment.controller';
import { SupportDeleteCommentByIdController } from './controllers/support-delete-comment-by-id.controller';
import { SupportDeleteCommentsController } from './controllers/support-delete-comments.controller';
import { SupportFindCommentByIdController } from './controllers/support-find-comment-by-id.controller';
import { SupportFindCommentController } from './controllers/support-find-comment.controller';
import { SupportGetCommentsController } from './controllers/support-get-comments.controller';
import { SupportPaginateCommentsController } from './controllers/support-paginate-comments.controller';
import { SupportUpdateCommentByIdController } from './controllers/support-update-comment-by-id.controller';
import { SupportUpdateCommentsController } from './controllers/support-update-comments.controller';

// import resolvers
import { SupportCreateCommentResolver } from './resolvers/support-create-comment.resolver';
import { SupportDeleteCommentByIdResolver } from './resolvers/support-delete-comment-by-id.resolver';
import { SupportDeleteCommentsResolver } from './resolvers/support-delete-comments.resolver';
import { SupportFindCommentByIdResolver } from './resolvers/support-find-comment-by-id.resolver';
import { SupportFindCommentResolver } from './resolvers/support-find-comment.resolver';
import { SupportGetCommentsResolver } from './resolvers/support-get-comments.resolver';
import { SupportPaginateCommentsResolver } from './resolvers/support-paginate-comments.resolver';
import { SupportUpdateCommentByIdResolver } from './resolvers/support-update-comment-by-id.resolver';
import { SupportUpdateCommentsResolver } from './resolvers/support-update-comments.resolver';

// import handlers
import { SupportCreateCommentHandler } from './handlers/support-create-comment.handler';
import { SupportDeleteCommentByIdHandler } from './handlers/support-delete-comment-by-id.handler';
import { SupportDeleteCommentsHandler } from './handlers/support-delete-comments.handler';
import { SupportFindCommentByIdHandler } from './handlers/support-find-comment-by-id.handler';
import { SupportFindCommentHandler } from './handlers/support-find-comment.handler';
import { SupportGetCommentsHandler } from './handlers/support-get-comments.handler';
import { SupportPaginateCommentsHandler } from './handlers/support-paginate-comments.handler';
import { SupportUpdateCommentByIdHandler } from './handlers/support-update-comment-by-id.handler';
import { SupportUpdateCommentsHandler } from './handlers/support-update-comments.handler';

// import seeder
import { SupportCommentSeeder } from './seeder/support-comment.seeder';

export const SupportCommentApiControllers = [
  SupportCreateCommentController,
  SupportPaginateCommentsController,
  SupportGetCommentsController,
  SupportFindCommentByIdController,
  SupportFindCommentController,
  SupportUpdateCommentByIdController,
  SupportUpdateCommentsController,
  SupportDeleteCommentByIdController,
  SupportDeleteCommentsController,
];

export const SupportCommentApiResolvers = [
  SupportCreateCommentResolver,
  SupportPaginateCommentsResolver,
  SupportGetCommentsResolver,
  SupportFindCommentByIdResolver,
  SupportFindCommentResolver,
  SupportUpdateCommentByIdResolver,
  SupportUpdateCommentsResolver,
  SupportDeleteCommentByIdResolver,
  SupportDeleteCommentsResolver,
];

export const SupportCommentApiHandlers = [
  SupportCreateCommentHandler,
  SupportPaginateCommentsHandler,
  SupportGetCommentsHandler,
  SupportFindCommentByIdHandler,
  SupportFindCommentHandler,
  SupportUpdateCommentByIdHandler,
  SupportUpdateCommentsHandler,
  SupportDeleteCommentByIdHandler,
  SupportDeleteCommentsHandler,
];

export const SupportCommentApiServices = [SupportCommentSeeder];
