/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteLangsHandler } from './common-delete-langs.handler';
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteLangsHandler', () =>
{
    let handler: CommonDeleteLangsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteLangsHandler,
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

        handler = module.get<CommonDeleteLangsHandler>(CommonDeleteLangsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonDeleteLangsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteLangsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an langs deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(langs)));
            expect(await handler.main()).toBe(langs);
        });
    });
});