import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonCreateLangsHandler } from './common-create-langs.handler';
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';

describe('CommonCreateLangsHandler', () =>
{
    let handler: CommonCreateLangsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateLangsHandler,
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

        handler = module.get<CommonCreateLangsHandler>(CommonCreateLangsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonCreateLangsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an commonMockLangData created', async () =>
        {
            expect(await handler.main(commonMockLangData)).toBe(true);
        });
    });
});