/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockCountryData } from '@app/common/country/infrastructure/mock/common-mock-country.data';
import { CommonCreateCountriesCommandHandler } from './common-create-countries.command-handler';
import { CommonCreateCountriesCommand } from './common-create-countries.command';
import { CommonCreateCountriesService } from './common-create-countries.service';

describe('commonCreateCountriesCommandHandler', () =>
{
    let commandHandler: CommonCreateCountriesCommandHandler;
    let service: CommonCreateCountriesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateCountriesCommandHandler,
                {
                    provide : CommonCreateCountriesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonCreateCountriesCommandHandler>(CommonCreateCountriesCommandHandler);
        service = module.get<CommonCreateCountriesService>(CommonCreateCountriesService);
    });

    describe('main', () =>
    {
        test('CommonCreateCountriesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return CommonMockCountryData createds', async () =>
        {
            expect(await commandHandler.execute(
                new CommonCreateCountriesCommand(
                    commonMockCountryData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});