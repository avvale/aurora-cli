import { CommonDeleteCountriesCommand } from '@app/common/country';
import { CommonDeleteCountriesCommandHandler } from '@app/common/country/application/delete/common-delete-countries.command-handler';
import { CommonDeleteCountriesService } from '@app/common/country/application/delete/common-delete-countries.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteCountriesCommandHandler', () =>
{
    let commandHandler: CommonDeleteCountriesCommandHandler;

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
