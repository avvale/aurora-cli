/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { StorageAccountUploadFilesFileManagerHandler } from '@api/storage-account/file-manager';
import { mapControllerFilesWithStream } from '@api/storage-account/shared/functions/map-controller-files-with-stream.function';
import { Auth } from '@aurora/decorators';
import {
    Body,
    Controller,
    HttpCode,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[storage-account] file-manager')
@Controller('storage-account/file-manager/upload-files')
@Auth('storageAccount.fileManager.upload')
export class StorageAccountUploadFilesFileManagerController {
    constructor(
        private readonly handler: StorageAccountUploadFilesFileManagerHandler,
    ) {}

    @Post()
    @UseInterceptors(FilesInterceptor('binaries'))
    @HttpCode(200)
    @ApiOperation({ summary: 'Upload files' })
    @ApiCreatedResponse({
        description: 'The record has been successfully uploaded.',
        type: String,
    })
    async main(
        @Body('files') filesRaw: string,
        @UploadedFiles() binaries?: Express.Multer.File[],
    ) {
        const files = JSON.parse(filesRaw);

        const filesWithStream = mapControllerFilesWithStream(files, binaries);

        return await this.handler.main(filesWithStream);
    }
}
