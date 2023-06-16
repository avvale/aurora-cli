import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteCountryByIdCommandHandler } from './common-delete-country-by-id.command-handler';
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';
import { CommonDeleteCountryByIdCommand } from './common-delete-country-by-id.command';
import { CommonDeleteCountryByIdService } from './common-delete-country-by-id.service';

describe('CommonDeleteCountryByIdCommandHandler', () =>
{
    let commandHandler: DeleteCountryByIdCommandHandler;
    let service: DeleteCountryByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteCountryByIdCommandHandler,
                {
                    provide : DeleteCountryByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<DeleteCountryByIdCommandHandler>(DeleteCountryByIdCommandHandler);
        service = module.get<DeleteCountryByIdService>(DeleteCountryByIdService);
    });

    describe('main', () =>
    {
        test('DeleteCountryByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteCountryByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteCountryByIdCommand(
                    countries[0].id,
                ),
            )).toBe(undefined);
        });
    });
});