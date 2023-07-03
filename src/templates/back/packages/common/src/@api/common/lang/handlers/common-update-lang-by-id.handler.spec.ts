/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateLangByIdHandler } from '@api/common/lang';
import { CommonUpdateLangByIdInput } from '@api/graphql';
import { commonMockLangData } from '@app/common/lang';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateLangByIdHandler', () =>
{
    let handler: CommonUpdateLangByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateLangByIdHandler,
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

        handler = module.get<CommonUpdateLangByIdHandler>(CommonUpdateLangByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonUpdateLangByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateLangByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a lang updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData[0])));
            expect(await handler.main(<CommonUpdateLangByIdInput>commonMockLangData[0])).toBe(commonMockLangData[0]);
        });
    });
});