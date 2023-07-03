import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteCountriesCommandHandler } from './common-delete-countries.command-handler';
import { CommonDeleteCountriesCommand } from './common-delete-countries.command';
import { CommonDeleteCountriesService } from './common-delete-countries.service';

describe('CommonDeleteCountriesCommandHandler', () =>
{
    let commandHandler: CommonDeleteCountriesCommandHandler;
    let service: CommonDeleteCountriesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteCountriesCommandHandler,
                {
                    provide : CommonDeleteCountriesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteCountriesCommandHandler>(CommonDeleteCountriesCommandHandler);
        service = module.get<CommonDeleteCountriesService>(CommonDeleteCountriesService);
    });

    describe('main', () =>
    {
        test('CommonDeleteCountriesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteCountriesCommand(),
            )).toBe(undefined);
        });
    });
});