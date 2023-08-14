import { CommonUpsertAttachmentFamilyController, CommonUpsertAttachmentFamilyHandler } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAttachmentFamilyController', () =>
{
    let controller: CommonUpsertAttachmentFamilyController;
    let handler: CommonUpsertAttachmentFamilyHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpsertAttachmentFamilyController,
            ],
            providers: [
                {
                    provide : CommonUpsertAttachmentFamilyHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpsertAttachmentFamilyController>(CommonUpsertAttachmentFamilyController);
        handler = module.get<CommonUpsertAttachmentFamilyHandler>(CommonUpsertAttachmentFamilyHandler);
    });

    describe('main', () =>
    {
        test('CommonUpsertAttachmentFamilyController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an attachmentFamily upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentFamilyData[0])));
            expect(await controller.main(commonMockAttachmentFamilyData[0])).toBe(commonMockAttachmentFamilyData[0]);
        });
    });
});
