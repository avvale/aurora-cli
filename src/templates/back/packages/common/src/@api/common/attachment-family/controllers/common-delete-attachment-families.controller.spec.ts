import { CommonDeleteAttachmentFamiliesController, CommonDeleteAttachmentFamiliesHandler } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentFamiliesController', () =>
{
    let controller: CommonDeleteAttachmentFamiliesController;
    let handler: CommonDeleteAttachmentFamiliesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonDeleteAttachmentFamiliesController,
            ],
            providers: [
                {
                    provide : CommonDeleteAttachmentFamiliesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteAttachmentFamiliesController>(CommonDeleteAttachmentFamiliesController);
        handler = module.get<CommonDeleteAttachmentFamiliesHandler>(CommonDeleteAttachmentFamiliesHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentFamiliesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an commonMockAttachmentFamilyData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentFamilyData)));
            expect(await controller.main()).toBe(commonMockAttachmentFamilyData);
        });
    });
});
