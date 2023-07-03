import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteCountryByIdCommandHandler } from './common-delete-country-by-id.command-handler';
import { commonMockCountryData } from '@app/common/country/infrastructure/mock/common-mock-country.data';
import { CommonDeleteCountryByIdCommand } from './common-delete-country-by-id.command';
import { CommonDeleteCountryByIdService } from './common-delete-country-by-id.service';

describe('CommonDeleteCountryByIdCommandHandler', () =>
{
    let commandHandler: CommonDeleteCountryByIdCommandHandler;
    let service: CommonDeleteCountryByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteCountryByIdCommandHandler,
                {
                    provide : CommonDeleteCountryByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteCountryByIdCommandHandler>(CommonDeleteCountryByIdCommandHandler);
        service = module.get<CommonDeleteCountryByIdService>(CommonDeleteCountryByIdService);
    });

    describe('main', () =>
    {
        test('CommonDeleteCountryByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the CommonDeleteCountryByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteCountryByIdCommand(
                    commonMockCountryData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});