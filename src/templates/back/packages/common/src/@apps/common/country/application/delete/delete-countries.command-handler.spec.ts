import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteCountriesCommandHandler } from './delete-countries.command-handler';
import { DeleteCountriesCommand } from './delete-countries.command';
import { DeleteCountriesService } from './delete-countries.service';

describe('DeleteCountriesCommandHandler', () =>
{
    let commandHandler: DeleteCountriesCommandHandler;
    let service: DeleteCountriesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteCountriesCommandHandler,
                {
                    provide : DeleteCountriesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<DeleteCountriesCommandHandler>(DeleteCountriesCommandHandler);
        service         = module.get<DeleteCountriesService>(DeleteCountriesService);
    });

    describe('main', () =>
    {
        test('DeleteCountriesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteCountriesCommand(),
            )).toBe(undefined);
        });
    });
});