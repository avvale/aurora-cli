import { Module } from '@nestjs/common';
import { SharedModule } from '@aurora/shared.module';
import { AzureStorageAccountBlobApiControllers, AzureStorageAccountBlobApiHandlers, AzureStorageAccountBlobApiResolvers, AzureStorageAccountBlobApiServices } from './blob';

@Module({
    imports: [
        SharedModule,
    ],
    controllers: [
        ...AzureStorageAccountBlobApiControllers,
    ],
    providers: [
        ...AzureStorageAccountBlobApiServices,
        ...AzureStorageAccountBlobApiHandlers,
        ...AzureStorageAccountBlobApiResolvers,
    ],
})
export class AzureStorageAccountModule {}
