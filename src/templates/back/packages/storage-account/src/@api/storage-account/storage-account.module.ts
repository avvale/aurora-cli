import { Module } from '@nestjs/common';
import { SharedModule } from '@aurora/shared.module';
import { StorageAccountFileManagerApiControllers, StorageAccountFileManagerApiHandlers, StorageAccountFileManagerApiResolvers, StorageAccountFileManagerApiServices } from './file-manager';
import { StorageAccountSeeder } from './storage-account.seeder';

@Module({
    imports: [
        SharedModule,
    ],
    controllers: [
        ...StorageAccountFileManagerApiControllers,
    ],
    providers: [
        StorageAccountSeeder,
        ...StorageAccountFileManagerApiServices,
        ...StorageAccountFileManagerApiHandlers,
        ...StorageAccountFileManagerApiResolvers,
    ],
})
export class StorageAccountModule {}
