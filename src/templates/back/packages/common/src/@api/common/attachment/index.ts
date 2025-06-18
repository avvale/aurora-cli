// export DTOs
export { CommonAttachmentDto } from './dto/common-attachment.dto';
export { CommonCreateAttachmentDto } from './dto/common-create-attachment.dto';
export { CommonUpdateAttachmentByIdDto } from './dto/common-update-attachment-by-id.dto';
export { CommonUpdateAttachmentsDto } from './dto/common-update-attachments.dto';

// export handlers
export { CommonCreateAttachmentHandler } from './handlers/common-create-attachment.handler';
export { CommonCreateAttachmentsHandler } from './handlers/common-create-attachments.handler';
export { CommonPaginateAttachmentsHandler } from './handlers/common-paginate-attachments.handler';
export { CommonGetAttachmentsHandler } from './handlers/common-get-attachments.handler';
export { CommonFindAttachmentByIdHandler } from './handlers/common-find-attachment-by-id.handler';
export { CommonFindAttachmentHandler } from './handlers/common-find-attachment.handler';
export { CommonUpdateAttachmentByIdHandler } from './handlers/common-update-attachment-by-id.handler';
export { CommonUpdateAttachmentsHandler } from './handlers/common-update-attachments.handler';
export { CommonUpsertAttachmentHandler } from './handlers/common-upsert-attachment.handler';
export { CommonDeleteAttachmentByIdHandler } from './handlers/common-delete-attachment-by-id.handler';
export { CommonDeleteAttachmentsHandler } from './handlers/common-delete-attachments.handler';

// export controllers
export { CommonCreateAttachmentController } from './controllers/common-create-attachment.controller';
export { CommonCreateAttachmentsController } from './controllers/common-create-attachments.controller';
export { CommonPaginateAttachmentsController } from './controllers/common-paginate-attachments.controller';
export { CommonGetAttachmentsController } from './controllers/common-get-attachments.controller';
export { CommonFindAttachmentByIdController } from './controllers/common-find-attachment-by-id.controller';
export { CommonFindAttachmentController } from './controllers/common-find-attachment.controller';
export { CommonUpdateAttachmentByIdController } from './controllers/common-update-attachment-by-id.controller';
export { CommonUpdateAttachmentsController } from './controllers/common-update-attachments.controller';
export { CommonUpsertAttachmentController } from './controllers/common-upsert-attachment.controller';
export { CommonDeleteAttachmentByIdController } from './controllers/common-delete-attachment-by-id.controller';
export { CommonDeleteAttachmentsController } from './controllers/common-delete-attachments.controller';

// export resolvers
export { CommonCreateAttachmentResolver } from './resolvers/common-create-attachment.resolver';
export { CommonCreateAttachmentsResolver } from './resolvers/common-create-attachments.resolver';
export { CommonPaginateAttachmentsResolver } from './resolvers/common-paginate-attachments.resolver';
export { CommonGetAttachmentsResolver } from './resolvers/common-get-attachments.resolver';
export { CommonFindAttachmentByIdResolver } from './resolvers/common-find-attachment-by-id.resolver';
export { CommonFindAttachmentResolver } from './resolvers/common-find-attachment.resolver';
export { CommonUpdateAttachmentByIdResolver } from './resolvers/common-update-attachment-by-id.resolver';
export { CommonUpdateAttachmentsResolver } from './resolvers/common-update-attachments.resolver';
export { CommonUpsertAttachmentResolver } from './resolvers/common-upsert-attachment.resolver';
export { CommonDeleteAttachmentByIdResolver } from './resolvers/common-delete-attachment-by-id.resolver';
export { CommonDeleteAttachmentsResolver } from './resolvers/common-delete-attachments.resolver';

// export additionalApis
export { CommonDeleteAttachmentController } from './controllers/common-delete-attachment.controller';
export { CommonDeleteAttachmentHandler } from './handlers/common-delete-attachment.handler';
export { CommonDeleteAttachmentResolver } from './resolvers/common-delete-attachment.resolver';

// import controllers
import { CommonCreateAttachmentController } from './controllers/common-create-attachment.controller';
import { CommonCreateAttachmentsController } from './controllers/common-create-attachments.controller';
import { CommonPaginateAttachmentsController } from './controllers/common-paginate-attachments.controller';
import { CommonGetAttachmentsController } from './controllers/common-get-attachments.controller';
import { CommonFindAttachmentByIdController } from './controllers/common-find-attachment-by-id.controller';
import { CommonFindAttachmentController } from './controllers/common-find-attachment.controller';
import { CommonUpdateAttachmentByIdController } from './controllers/common-update-attachment-by-id.controller';
import { CommonUpdateAttachmentsController } from './controllers/common-update-attachments.controller';
import { CommonUpsertAttachmentController } from './controllers/common-upsert-attachment.controller';
import { CommonDeleteAttachmentByIdController } from './controllers/common-delete-attachment-by-id.controller';
import { CommonDeleteAttachmentsController } from './controllers/common-delete-attachments.controller';

// import resolvers
import { CommonCreateAttachmentResolver } from './resolvers/common-create-attachment.resolver';
import { CommonCreateAttachmentsResolver } from './resolvers/common-create-attachments.resolver';
import { CommonPaginateAttachmentsResolver } from './resolvers/common-paginate-attachments.resolver';
import { CommonGetAttachmentsResolver } from './resolvers/common-get-attachments.resolver';
import { CommonFindAttachmentByIdResolver } from './resolvers/common-find-attachment-by-id.resolver';
import { CommonFindAttachmentResolver } from './resolvers/common-find-attachment.resolver';
import { CommonUpdateAttachmentByIdResolver } from './resolvers/common-update-attachment-by-id.resolver';
import { CommonUpdateAttachmentsResolver } from './resolvers/common-update-attachments.resolver';
import { CommonUpsertAttachmentResolver } from './resolvers/common-upsert-attachment.resolver';
import { CommonDeleteAttachmentByIdResolver } from './resolvers/common-delete-attachment-by-id.resolver';
import { CommonDeleteAttachmentsResolver } from './resolvers/common-delete-attachments.resolver';

// import handlers
import { CommonCreateAttachmentHandler } from './handlers/common-create-attachment.handler';
import { CommonCreateAttachmentsHandler } from './handlers/common-create-attachments.handler';
import { CommonPaginateAttachmentsHandler } from './handlers/common-paginate-attachments.handler';
import { CommonGetAttachmentsHandler } from './handlers/common-get-attachments.handler';
import { CommonFindAttachmentByIdHandler } from './handlers/common-find-attachment-by-id.handler';
import { CommonFindAttachmentHandler } from './handlers/common-find-attachment.handler';
import { CommonUpdateAttachmentByIdHandler } from './handlers/common-update-attachment-by-id.handler';
import { CommonUpdateAttachmentsHandler } from './handlers/common-update-attachments.handler';
import { CommonUpsertAttachmentHandler } from './handlers/common-upsert-attachment.handler';
import { CommonDeleteAttachmentByIdHandler } from './handlers/common-delete-attachment-by-id.handler';
import { CommonDeleteAttachmentsHandler } from './handlers/common-delete-attachments.handler';

// import seeder
import { CommonAttachmentSeeder } from './seeder/common-attachment.seeder';

// import additionalApis
import { CommonDeleteAttachmentController } from './controllers/common-delete-attachment.controller';
import { CommonDeleteAttachmentHandler } from './handlers/common-delete-attachment.handler';
import { CommonDeleteAttachmentResolver } from './resolvers/common-delete-attachment.resolver';

export const CommonAttachmentApiControllers = [
    CommonCreateAttachmentController,
    CommonCreateAttachmentsController,
    CommonPaginateAttachmentsController,
    CommonGetAttachmentsController,
    CommonFindAttachmentByIdController,
    CommonFindAttachmentController,
    CommonUpdateAttachmentByIdController,
    CommonUpdateAttachmentsController,
    CommonUpsertAttachmentController,
    CommonDeleteAttachmentByIdController,
    CommonDeleteAttachmentsController,

    // additionalApis
    CommonDeleteAttachmentController,
];

export const CommonAttachmentApiResolvers = [
    CommonCreateAttachmentResolver,
    CommonCreateAttachmentsResolver,
    CommonPaginateAttachmentsResolver,
    CommonGetAttachmentsResolver,
    CommonFindAttachmentByIdResolver,
    CommonFindAttachmentResolver,
    CommonUpdateAttachmentByIdResolver,
    CommonUpdateAttachmentsResolver,
    CommonUpsertAttachmentResolver,
    CommonDeleteAttachmentByIdResolver,
    CommonDeleteAttachmentsResolver,

    // additionalApis
    CommonDeleteAttachmentResolver,
];

export const CommonAttachmentApiHandlers = [
    CommonCreateAttachmentHandler,
    CommonCreateAttachmentsHandler,
    CommonPaginateAttachmentsHandler,
    CommonGetAttachmentsHandler,
    CommonFindAttachmentByIdHandler,
    CommonFindAttachmentHandler,
    CommonUpdateAttachmentByIdHandler,
    CommonUpdateAttachmentsHandler,
    CommonUpsertAttachmentHandler,
    CommonDeleteAttachmentByIdHandler,
    CommonDeleteAttachmentsHandler,

    // additionalApis
    CommonDeleteAttachmentHandler,
];

export const CommonAttachmentApiServices = [
    CommonAttachmentSeeder,
];
