/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindAttachmentLibraryByIdHandler, CommonFindAttachmentLibraryByIdResolver } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentLibraryByIdResolver', () =>
{
    let resolver: CommonFindAttachmentLibraryByIdResolver;
    let handler: CommonFindAttachmentLibraryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindAttachmentLibraryByIdResolver,
                {
                    provide : CommonFindAttachmentLibraryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonFindAttachmentLibraryByIdResolver>(CommonFindAttachmentLibraryByIdResolver);
        handler = module.get<CommonFindAttachmentLibraryByIdHandler>(CommonFindAttachmentLibraryByIdHandler);
    });

    test('CommonFindAttachmentLibraryByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindAttachmentLibraryByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an attachmentLibrary by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentLibraryData[0])));
            expect(await resolver.main(commonMockAttachmentLibraryData[0].id)).toBe(commonMockAttachmentLibraryData[0]);
        });
    });
});
