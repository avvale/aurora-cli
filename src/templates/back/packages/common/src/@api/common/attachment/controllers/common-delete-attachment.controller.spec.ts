/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteAttachmentHandler } from '../handlers/common-delete-attachment.handler';
import { CommonDeleteAttachmentController } from './common-delete-attachment.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentController', () =>
{
    let controller: CommonDeleteAttachmentController;
    let handler: CommonDeleteAttachmentHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonDeleteAttachmentController,
            ],
            providers: [
                {
                    provide : CommonDeleteAttachmentHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteAttachmentController>(CommonDeleteAttachmentController);
        handler = module.get<CommonDeleteAttachmentHandler>(CommonDeleteAttachmentHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});