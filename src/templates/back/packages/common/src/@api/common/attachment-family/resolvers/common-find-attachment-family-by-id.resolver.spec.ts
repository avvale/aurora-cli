/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindAttachmentFamilyByIdHandler, CommonFindAttachmentFamilyByIdResolver } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentFamilyByIdResolver', () =>
{
    let resolver: CommonFindAttachmentFamilyByIdResolver;
    let handler: CommonFindAttachmentFamilyByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindAttachmentFamilyByIdResolver,
                {
                    provide : CommonFindAttachmentFamilyByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonFindAttachmentFamilyByIdResolver>(CommonFindAttachmentFamilyByIdResolver);
        handler = module.get<CommonFindAttachmentFamilyByIdHandler>(CommonFindAttachmentFamilyByIdHandler);
    });

    test('CommonFindAttachmentFamilyByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindAttachmentFamilyByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an attachmentFamily by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentFamilyData[0])));
            expect(await resolver.main(commonMockAttachmentFamilyData[0].id)).toBe(commonMockAttachmentFamilyData[0]);
        });
    });
});
