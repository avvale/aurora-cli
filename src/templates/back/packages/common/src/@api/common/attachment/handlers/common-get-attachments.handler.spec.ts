/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonGetAttachmentsHandler } from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAttachmentsHandler', () =>
{
    let handler: CommonGetAttachmentsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonGetAttachmentsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<CommonGetAttachmentsHandler>(CommonGetAttachmentsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonGetAttachmentsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonGetAttachmentsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a commonMockAttachmentData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(commonMockAttachmentData);
        });
    });
});
