/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateAttachmentByIdHandler } from '@api/common/attachment';
import { CommonUpdateAttachmentByIdInput } from '@api/graphql';
import { commonMockAttachmentData } from '@app/common/attachment';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentByIdHandler', () =>
{
    let handler: CommonUpdateAttachmentByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAttachmentByIdHandler,
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

        handler = module.get<CommonUpdateAttachmentByIdHandler>(CommonUpdateAttachmentByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonUpdateAttachmentByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAttachmentByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a attachment updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentData[0])));
            expect(
                await handler.main(
                    <CommonUpdateAttachmentByIdInput>commonMockAttachmentData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(commonMockAttachmentData[0]);
        });
    });
});
