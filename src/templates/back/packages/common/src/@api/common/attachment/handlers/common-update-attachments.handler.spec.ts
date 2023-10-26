/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateAttachmentsHandler } from '@api/common/attachment';
import { CommonUpdateAttachmentsInput } from '@api/graphql';
import { commonMockAttachmentData } from '@app/common/attachment';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentsHandler', () =>
{
    let handler: CommonUpdateAttachmentsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAttachmentsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<CommonUpdateAttachmentsHandler>(CommonUpdateAttachmentsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonUpdateAttachmentsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAttachmentsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a attachments updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentData[0])));
            expect(
                await handler.main(
                    <CommonUpdateAttachmentsInput>commonMockAttachmentData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(commonMockAttachmentData[0]);
        });
    });
});
