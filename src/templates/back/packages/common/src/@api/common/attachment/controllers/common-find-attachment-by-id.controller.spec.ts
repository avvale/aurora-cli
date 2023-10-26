import { CommonFindAttachmentByIdController, CommonFindAttachmentByIdHandler } from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentByIdController', () =>
{
    let controller: CommonFindAttachmentByIdController;
    let handler: CommonFindAttachmentByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonFindAttachmentByIdController,
            ],
            providers: [
                {
                    provide : CommonFindAttachmentByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonFindAttachmentByIdController>(CommonFindAttachmentByIdController);
        handler = module.get<CommonFindAttachmentByIdHandler>(CommonFindAttachmentByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonFindAttachmentByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an attachment by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentData[0])));
            expect(await controller.main(commonMockAttachmentData[0].id)).toBe(commonMockAttachmentData[0]);
        });
    });
});
