/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonPaginateLangsHandler } from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateLangsHandler', () =>
{
    let handler: CommonPaginateLangsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonPaginateLangsHandler,
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

        handler = module.get<CommonPaginateLangsHandler>(CommonPaginateLangsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonPaginateLangsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonPaginateLangsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a langs', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: commonMockLangData.length,
                count: commonMockLangData.length,
                rows : commonMockLangData,
            })));
            expect(await handler.main()).toEqual({
                total: commonMockLangData.length,
                count: commonMockLangData.length,
                rows : commonMockLangData,
            });
        });
    });
});