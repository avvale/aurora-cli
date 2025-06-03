// export handlers
export { AzureStorageAccountGetBase64FromBlobHandler } from './handlers/azure-storage-account-get-base64-from-blob.handler';
export { AzureStorageAccountUploadBlobHandler } from './handlers/azure-storage-account-upload-blob.handler';

// import controllers
import { AzureStorageAccountGetBase64FromBlobController } from './controllers/azure-storage-account-get-base64-from-blob.controller';

// import resolvers
import { AzureStorageAccountGetBase64FromBlobResolver } from './resolvers/azure-storage-account-get-base64-from-blob.resolver';
import { AzureStorageAccountUploadBlobResolver } from './resolvers/azure-storage-account-upload-blob.resolver';

// import handlers
import { AzureStorageAccountGetBase64FromBlobHandler } from './handlers/azure-storage-account-get-base64-from-blob.handler';
import { AzureStorageAccountUploadBlobHandler } from './handlers/azure-storage-account-upload-blob.handler';

// import services
import { AzureStorageAccountCopyBlobService, AzureStorageAccountGetBase64FromBlobService, AzureStorageAccountUploadBlobService } from './shared';

export const AzureStorageAccountBlobApiControllers = [
    AzureStorageAccountGetBase64FromBlobController,
];

export const AzureStorageAccountBlobApiResolvers = [
    AzureStorageAccountGetBase64FromBlobResolver,
    AzureStorageAccountUploadBlobResolver,
];

export const AzureStorageAccountBlobApiHandlers = [
    AzureStorageAccountGetBase64FromBlobHandler,
    AzureStorageAccountUploadBlobHandler,
];

export const AzureStorageAccountBlobApiServices = [
    AzureStorageAccountCopyBlobService,
    AzureStorageAccountGetBase64FromBlobService,
    AzureStorageAccountUploadBlobService,
];
