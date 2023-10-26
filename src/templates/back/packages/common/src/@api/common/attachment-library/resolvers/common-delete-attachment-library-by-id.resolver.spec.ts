/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteAttachmentLibraryByIdHandler, CommonDeleteAttachmentLibraryByIdResolver } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentLibraryByIdResolver', () =>
{
    let resolver: CommonDeleteAttachmentLibraryByIdResolver;
    let handler: CommonDeleteAttachmentLibraryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteAttachmentLibraryByIdResolver,
                {
                    provide : CommonDeleteAttachmentLibraryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonDeleteAttachmentLibraryByIdResolver>(CommonDeleteAttachmentLibraryByIdResolver);
        handler = module.get<CommonDeleteAttachmentLibraryByIdHandler>(CommonDeleteAttachmentLibraryByIdHandler);
    });

    test('CommonDeleteAttachmentLibraryByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentLibraryByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an attachmentLibrary deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentLibraryData[0])));
            expect(await resolver.main(commonMockAttachmentLibraryData[0].id)).toBe(commonMockAttachmentLibraryData[0]);
        });
    });
});
