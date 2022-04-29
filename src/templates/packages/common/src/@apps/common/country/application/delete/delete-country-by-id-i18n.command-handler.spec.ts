import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteCountryByIdI18NCommandHandler } from './delete-country-by-id-i18n.command-handler';
import { countries } from '../../../../../@apps/common/country/infrastructure/seeds/country.seed';
import { DeleteCountryByIdI18NCommand } from './delete-country-by-id-i18n.command';
import { DeleteCountryByIdI18NService } from './delete-country-by-id-i18n.service';

describe('DeleteCountryByIdI18NCommandHandler', () =>
{
    let commandHandler: DeleteCountryByIdI18NCommandHandler;
    let service: DeleteCountryByIdI18NService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteCountryByIdI18NCommandHandler,
                {
                    provide: DeleteCountryByIdI18NService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteCountryByIdI18NCommandHandler>(DeleteCountryByIdI18NCommandHandler);
        service         = module.get<DeleteCountryByIdI18NService>(DeleteCountryByIdI18NService);
    });

    describe('main', () =>
    {
        test('DeleteCountryByIdI18NCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteCountryByIdI18NService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteCountryByIdI18NCommand(
                    countries[0].id,
                )
            )).toBe(undefined);
        });
    });
});