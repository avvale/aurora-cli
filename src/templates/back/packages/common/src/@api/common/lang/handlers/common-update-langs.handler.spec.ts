/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateLangsHandler } from '@api/common/lang';
import { CommonUpdateLangsInput } from '@api/graphql';
import { commonMockLangData } from '@app/common/lang';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateLangsHandler', () =>
{
    let handler: CommonUpdateLangsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateLangsHandler,
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

        handler = module.get<CommonUpdateLangsHandler>(CommonUpdateLangsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonUpdateLangsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateLangsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a langs updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData[0])));
            expect(await handler.main(<CommonUpdateLangsInput>commonMockLangData[0])).toBe(commonMockLangData[0]);
        });
    });
});