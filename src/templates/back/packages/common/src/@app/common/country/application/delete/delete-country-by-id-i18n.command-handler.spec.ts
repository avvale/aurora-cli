import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteCountryByIdI18nCommandHandler } from './delete-country-by-id-i18n.command-handler';
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';
import { DeleteCountryByIdI18nCommand } from './delete-country-by-id-i18n.command';
import { DeleteCountryByIdI18nService } from './delete-country-by-id-i18n.service';

describe('DeleteCountryByIdI18nCommandHandler', () =>
{
    let commandHandler: DeleteCountryByIdI18nCommandHandler;
    let service: DeleteCountryByIdI18nService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteCountryByIdI18nCommandHandler,
                {
                    provide: DeleteCountryByIdI18nService,
                    useValue: {
                        main: () => {},
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<DeleteCountryByIdI18nCommandHandler>(DeleteCountryByIdI18nCommandHandler);
        service         = module.get<DeleteCountryByIdI18nService>(DeleteCountryByIdI18nService);
    });

    describe('main', () =>
    {
        test('DeleteCountryByIdI18nCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteCountryByIdI18nService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteCountryByIdI18nCommand(
                    countries[0].id,
                )
            )).toBe(undefined);
        });
    });
});