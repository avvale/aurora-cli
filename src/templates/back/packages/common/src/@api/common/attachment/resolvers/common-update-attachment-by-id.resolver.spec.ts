/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateAttachmentByIdHandler, CommonUpdateAttachmentByIdResolver } from '@api/common/attachment';
import { CommonUpdateAttachmentByIdInput } from '@api/graphql';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentByIdResolver', () =>
{
    let resolver: CommonUpdateAttachmentByIdResolver;
    let handler: CommonUpdateAttachmentByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAttachmentByIdResolver,
                {
                    provide : CommonUpdateAttachmentByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateAttachmentByIdResolver>(CommonUpdateAttachmentByIdResolver);
        handler = module.get<CommonUpdateAttachmentByIdHandler>(CommonUpdateAttachmentByIdHandler);
    });

    test('CommonUpdateAttachmentByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAttachmentByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a attachment by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentData[0])));
            expect(await resolver.main(<CommonUpdateAttachmentByIdInput>commonMockAttachmentData[0])).toBe(commonMockAttachmentData[0]);
        });
    });
});
