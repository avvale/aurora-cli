/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindAttachmentFamilyHandler } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentFamilyHandler', () =>
{
    let handler: CommonFindAttachmentFamilyHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindAttachmentFamilyHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<CommonFindAttachmentFamilyHandler>(CommonFindAttachmentFamilyHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonFindAttachmentFamilyHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindAttachmentFamilyHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a attachmentFamily', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentFamilyData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(commonMockAttachmentFamilyData[0]);
        });
    });
});
