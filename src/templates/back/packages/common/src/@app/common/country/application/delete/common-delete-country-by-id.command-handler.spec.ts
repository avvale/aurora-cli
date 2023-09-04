import { CommonDeleteCountryByIdCommand, commonMockCountryData } from '@app/common/country';
import { CommonDeleteCountryByIdCommandHandler } from '@app/common/country/application/delete/common-delete-country-by-id.command-handler';
import { CommonDeleteCountryByIdService } from '@app/common/country/application/delete/common-delete-country-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteCountryByIdCommandHandler', () =>
{
    let commandHandler: CommonDeleteCountryByIdCommandHandler;

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
