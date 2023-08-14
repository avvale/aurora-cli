import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteAdministrativeAreaLevel3ByIdCommandHandler } from './common-delete-administrative-area-level-3-by-id.command-handler';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.data';
import { CommonDeleteAdministrativeAreaLevel3ByIdCommand } from './common-delete-administrative-area-level-3-by-id.command';
import { CommonDeleteAdministrativeAreaLevel3ByIdService } from './common-delete-administrative-area-level-3-by-id.service';

describe('CommonDeleteAdministrativeAreaLevel3ByIdCommandHandler', () =>
{
    let commandHandler: CommonDeleteAdministrativeAreaLevel3ByIdCommandHandler;
    let service: CommonDeleteAdministrativeAreaLevel3ByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteAdministrativeAreaLevel3ByIdCommandHandler,
                {
                    provide : CommonDeleteAdministrativeAreaLevel3ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteAdministrativeAreaLevel3ByIdCommandHandler>(CommonDeleteAdministrativeAreaLevel3ByIdCommandHandler);
        service = module.get<CommonDeleteAdministrativeAreaLevel3ByIdService>(CommonDeleteAdministrativeAreaLevel3ByIdService);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreaLevel3ByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the CommonDeleteAdministrativeAreaLevel3ByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteAdministrativeAreaLevel3ByIdCommand(
                    commonMockAdministrativeAreaLevel3Data[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
