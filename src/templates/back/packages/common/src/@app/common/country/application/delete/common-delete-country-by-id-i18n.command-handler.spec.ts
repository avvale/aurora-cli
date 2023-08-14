import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteCountryByIdI18nCommandHandler } from './common-delete-country-by-id-i18n.command-handler';
import { commonMockCountryData } from '@app/common/country/infrastructure/mock/common-mock-country.data';
import { CommonDeleteCountryByIdI18nCommand } from './common-delete-country-by-id-i18n.command';
import { CommonDeleteCountryByIdI18nService } from './common-delete-country-by-id-i18n.service';

describe('CommonDeleteCountryByIdI18nCommandHandler', () =>
{
    let commandHandler: CommonDeleteCountryByIdI18nCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteCountryByIdI18nCommandHandler,
                {
                    provide : CommonDeleteCountryByIdI18nService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteCountryByIdI18nCommandHandler>(CommonDeleteCountryByIdI18nCommandHandler);
    });

    describe('main', () =>
    {
        test('DeleteCountryByIdI18nCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteCountryByIdI18nService', async () =>
        {
            expect(
                await commandHandler.execute(
                    new CommonDeleteCountryByIdI18nCommand(
                        commonMockCountryData[0].id,
                    ),
                ),
            )
                .toBe(undefined);
        });
    });
});