/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCreateLangHandler } from './common-create-lang.handler';
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateLangHandler', () =>
{
    let handler: CommonCreateLangHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonCreateLangHandler,
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

        handler = module.get<CommonCreateLangHandler>(CommonCreateLangHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonCreateLangHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an lang created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await handler.main(langs[0])).toBe(langs[0]);
        });
    });
});