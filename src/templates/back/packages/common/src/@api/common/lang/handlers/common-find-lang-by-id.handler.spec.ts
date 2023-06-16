/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindLangByIdHandler } from './common-find-lang-by-id.handler';
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindLangByIdHandler', () =>
{
    let handler: CommonFindLangByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindLangByIdHandler,
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

        handler = module.get<CommonFindLangByIdHandler>(CommonFindLangByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonFindLangByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindLangByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an lang by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await handler.main(langs[0].id)).toBe(langs[0]);
        });
    });
});