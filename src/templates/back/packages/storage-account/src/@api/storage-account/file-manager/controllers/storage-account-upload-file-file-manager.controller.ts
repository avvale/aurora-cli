/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { StorageAccountUploadFileFileManagerHandler } from '@api/storage-account/file-manager';
import { mapControllerFileWithStream } from '@api/storage-account/shared';
import { Auth } from '@aurora/decorators';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[storage-account] file-manager')
@Controller('storage-account/file-manager/upload-file')
@Auth('storageAccount.fileManager.upload')
export class StorageAccountUploadFileFileManagerController {
  constructor(
    private readonly handler: StorageAccountUploadFileFileManagerHandler,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('binary'))
  @HttpCode(200)
  @ApiOperation({ summary: 'Upload file' })
  @ApiCreatedResponse({
    description: 'The record has been successfully uploaded.',
    type: String,
  })
  async main(
    @Body('file') fileRaw: string,
    @UploadedFile() binary?: Express.Multer.File,
  ) {
    const file = JSON.parse(fileRaw);

    const fileWithStream = mapControllerFileWithStream(file, binary);

    return await this.handler.main(fileWithStream);
  }
}
