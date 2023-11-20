/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCropAttachmentHandler } from '../handlers/common-crop-attachment.handler';
import { CommonCropAttachmentController } from './common-crop-attachment.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCropAttachmentController', () =>
{
    let controller: CommonCropAttachmentController;
    let handler: CommonCropAttachmentHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonCropAttachmentController,
            ],
            providers: [
                {
                    provide : CommonCropAttachmentHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCropAttachmentController>(CommonCropAttachmentController);
        handler = module.get<CommonCropAttachmentHandler>(CommonCropAttachmentHandler);
    });

    describe('main', () =>
    {
        test('CommonCropAttachmentController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});