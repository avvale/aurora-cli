/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUploadAttachmentsHandler } from '../handlers/common-upload-attachments.handler';
import { CommonUploadAttachmentsController } from './common-upload-attachments.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUploadAttachmentsController', () =>
{
    let controller: CommonUploadAttachmentsController;
    let handler: CommonUploadAttachmentsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUploadAttachmentsController,
            ],
            providers: [
                {
                    provide : CommonUploadAttachmentsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUploadAttachmentsController>(CommonUploadAttachmentsController);
        handler = module.get<CommonUploadAttachmentsHandler>(CommonUploadAttachmentsHandler);
    });

    describe('main', () =>
    {
        test('CommonUploadAttachmentsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});