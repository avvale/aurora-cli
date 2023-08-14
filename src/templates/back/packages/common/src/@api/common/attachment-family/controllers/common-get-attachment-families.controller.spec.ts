import { CommonGetAttachmentFamiliesController, CommonGetAttachmentFamiliesHandler } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAttachmentFamiliesController', () =>
{
    let controller: CommonGetAttachmentFamiliesController;
    let handler: CommonGetAttachmentFamiliesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonGetAttachmentFamiliesController,
            ],
            providers: [
                {
                    provide : CommonGetAttachmentFamiliesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonGetAttachmentFamiliesController>(CommonGetAttachmentFamiliesController);
        handler = module.get<CommonGetAttachmentFamiliesHandler>(CommonGetAttachmentFamiliesHandler);
    });

    describe('main', () =>
    {
        test('CommonGetAttachmentFamiliesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a commonMockAttachmentFamilyData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentFamilyData)));
            expect(await controller.main()).toBe(commonMockAttachmentFamilyData);
        });
    });
});
