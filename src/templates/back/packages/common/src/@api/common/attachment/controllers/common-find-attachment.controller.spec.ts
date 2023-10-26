import { CommonFindAttachmentController, CommonFindAttachmentHandler } from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentController', () =>
{
    let controller: CommonFindAttachmentController;
    let handler: CommonFindAttachmentHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonFindAttachmentController,
            ],
            providers: [
                {
                    provide : CommonFindAttachmentHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonFindAttachmentController>(CommonFindAttachmentController);
        handler = module.get<CommonFindAttachmentHandler>(CommonFindAttachmentHandler);
    });

    describe('main', () =>
    {
        test('CommonFindAttachmentController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a attachment', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentData[0])));
            expect(await controller.main()).toBe(commonMockAttachmentData[0]);
        });
    });
});
