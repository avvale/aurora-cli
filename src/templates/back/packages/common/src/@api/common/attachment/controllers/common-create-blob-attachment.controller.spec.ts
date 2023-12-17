/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCreateBlobAttachmentHandler } from '../handlers/common-create-blob-attachment.handler';
import { CommonCreateBlobAttachmentController } from './common-create-blob-attachment.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateBlobAttachmentController', () =>
{
    let controller: CommonCreateBlobAttachmentController;
    let handler: CommonCreateBlobAttachmentHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonCreateBlobAttachmentController,
            ],
            providers: [
                {
                    provide : CommonCreateBlobAttachmentHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateBlobAttachmentController>(CommonCreateBlobAttachmentController);
        handler = module.get<CommonCreateBlobAttachmentHandler>(CommonCreateBlobAttachmentHandler);
    });

    describe('main', () =>
    {
        test('CommonCreateBlobAttachmentController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});