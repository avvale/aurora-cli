import { CommonPaginateAttachmentFamiliesController, CommonPaginateAttachmentFamiliesHandler } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAttachmentFamiliesController', () =>
{
    let controller: CommonPaginateAttachmentFamiliesController;
    let handler: CommonPaginateAttachmentFamiliesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonPaginateAttachmentFamiliesController,
            ],
            providers: [
                {
                    provide : CommonPaginateAttachmentFamiliesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonPaginateAttachmentFamiliesController>(CommonPaginateAttachmentFamiliesController);
        handler = module.get<CommonPaginateAttachmentFamiliesHandler>(CommonPaginateAttachmentFamiliesHandler);
    });

    describe('main', () =>
    {
        test('CommonPaginateAttachmentFamiliesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a commonMockAttachmentFamilyData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : commonMockAttachmentFamilyData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : commonMockAttachmentFamilyData,
            });
        });
    });
});
