/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonUpdateLangByIdHandler } from './common-update-lang-by-id.handler';
import { CommonUpdateLangByIdInput } from '@api/graphql';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';

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
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await handler.main(<CommonUpdateLangByIdInput>langs[0])).toBe(langs[0]);
        });
    });
});