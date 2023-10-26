import { CommonUpsertAttachmentController, CommonUpsertAttachmentHandler } from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAttachmentController', () =>
{
    let controller: CommonUpsertAttachmentController;
    let handler: CommonUpsertAttachmentHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpsertAttachmentController,
            ],
            providers: [
                {
                    provide : CommonUpsertAttachmentHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpsertAttachmentController>(CommonUpsertAttachmentController);
        handler = module.get<CommonUpsertAttachmentHandler>(CommonUpsertAttachmentHandler);
    });

    describe('main', () =>
    {
        test('CommonUpsertAttachmentController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an attachment upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentData[0])));
            expect(await controller.main(commonMockAttachmentData[0])).toBe(commonMockAttachmentData[0]);
        });
    });
});
