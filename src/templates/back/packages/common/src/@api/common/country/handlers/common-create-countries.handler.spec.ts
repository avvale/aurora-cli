import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonCreateCountriesHandler } from './common-create-countries.handler';
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';

describe('CommonCreateCountriesHandler', () =>
{
    let handler: CommonCreateCountriesHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateCountriesHandler,
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

        handler = module.get<CommonCreateCountriesHandler>(CommonCreateCountriesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonCreateCountriesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an countries created', async () =>
        {
            expect(await handler.main(countries)).toBe(true);
        });
    });
});