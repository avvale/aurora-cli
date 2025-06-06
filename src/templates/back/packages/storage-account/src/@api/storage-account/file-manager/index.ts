// export DTOs
export { StorageAccountFileManagerFileUploadedDto } from './dto/storage-account-file-manager-file-uploaded.dto';
export { StorageAccountFileManagerFileDto } from './dto/storage-account-file-manager-file.dto';

// export services
export * from './shared/services/storage-account-file-manager.service';
export * from './shared/services/storage-account-local-file-manager.service';

// export handlers
export { StorageAccountCopyFileManagerHandler } from './handlers/storage-account-copy-file-manager.handler';
export { StorageAccountGetBase64FileFileManagerHandler } from './handlers/storage-account-get-base64-file-file-manager.handler';
export { StorageAccountGetBase64FilesFileManagerHandler } from './handlers/storage-account-get-base64-files-file-manager.handler';
export { StorageAccountUploadFileFileManagerHandler } from './handlers/storage-account-upload-file-file-manager.handler';
export { StorageAccountUploadFilesFileManagerHandler } from './handlers/storage-account-upload-files-file-manager.handler';

// import controllers
import { StorageAccountCopyFileManagerController } from './controllers/storage-account-copy-file-manager.controller';
import { StorageAccountGetBase64FileFileManagerController } from './controllers/storage-account-get-base64-file-file-manager.controller';
import { StorageAccountGetBase64FilesFileManagerController } from './controllers/storage-account-get-base64-files-file-manager.controller';
import { StorageAccountUploadFileFileManagerController } from './controllers/storage-account-upload-file-file-manager.controller';
import { StorageAccountUploadFilesFileManagerController } from './controllers/storage-account-upload-files-file-manager.controller';

// import resolvers
import { StorageAccountCopyFileManagerResolver } from './resolvers/storage-account-copy-file-manager.resolver';
import { StorageAccountGetBase64FileFileManagerResolver } from './resolvers/storage-account-get-base64-file-file-manager.resolver';
import { StorageAccountGetBase64FilesFileManagerResolver } from './resolvers/storage-account-get-base64-files-file-manager.resolver';
import { StorageAccountUploadFileFileManagerResolver } from './resolvers/storage-account-upload-file-file-manager.resolver';
import { StorageAccountUploadFilesFileManagerResolver } from './resolvers/storage-account-upload-files-file-manager.resolver';

// import handlers
import { StorageAccountCopyFileManagerHandler } from './handlers/storage-account-copy-file-manager.handler';
import { StorageAccountGetBase64FileFileManagerHandler } from './handlers/storage-account-get-base64-file-file-manager.handler';
import { StorageAccountGetBase64FilesFileManagerHandler } from './handlers/storage-account-get-base64-files-file-manager.handler';
import { StorageAccountUploadFileFileManagerHandler } from './handlers/storage-account-upload-file-file-manager.handler';
import { StorageAccountUploadFilesFileManagerHandler } from './handlers/storage-account-upload-files-file-manager.handler';

export const StorageAccountFileManagerApiControllers = [
    StorageAccountCopyFileManagerController,
    StorageAccountGetBase64FileFileManagerController,
    StorageAccountGetBase64FilesFileManagerController,
    StorageAccountUploadFileFileManagerController,
    StorageAccountUploadFilesFileManagerController,
];

export const StorageAccountFileManagerApiResolvers = [
    StorageAccountCopyFileManagerResolver,
    StorageAccountGetBase64FileFileManagerResolver,
    StorageAccountGetBase64FilesFileManagerResolver,
    StorageAccountUploadFileFileManagerResolver,
    StorageAccountUploadFilesFileManagerResolver,
];

export const StorageAccountFileManagerApiHandlers = [
    StorageAccountCopyFileManagerHandler,
    StorageAccountGetBase64FileFileManagerHandler,
    StorageAccountGetBase64FilesFileManagerHandler,
    StorageAccountUploadFileFileManagerHandler,
    StorageAccountUploadFilesFileManagerHandler,
];

export const StorageAccountFileManagerApiServices = [
];
