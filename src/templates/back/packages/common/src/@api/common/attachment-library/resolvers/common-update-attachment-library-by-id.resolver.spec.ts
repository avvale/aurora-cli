/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateAttachmentLibraryByIdHandler, CommonUpdateAttachmentLibraryByIdResolver } from '@api/common/attachment-library';
import { CommonUpdateAttachmentLibraryByIdInput } from '@api/graphql';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentLibraryByIdResolver', () =>
{
    let resolver: CommonUpdateAttachmentLibraryByIdResolver;
    let handler: CommonUpdateAttachmentLibraryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAttachmentLibraryByIdResolver,
                {
                    provide : CommonUpdateAttachmentLibraryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateAttachmentLibraryByIdResolver>(CommonUpdateAttachmentLibraryByIdResolver);
        handler = module.get<CommonUpdateAttachmentLibraryByIdHandler>(CommonUpdateAttachmentLibraryByIdHandler);
    });

    test('CommonUpdateAttachmentLibraryByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAttachmentLibraryByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a attachmentLibrary by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentLibraryData[0])));
            expect(await resolver.main(<CommonUpdateAttachmentLibraryByIdInput>commonMockAttachmentLibraryData[0])).toBe(commonMockAttachmentLibraryData[0]);
        });
    });
});
