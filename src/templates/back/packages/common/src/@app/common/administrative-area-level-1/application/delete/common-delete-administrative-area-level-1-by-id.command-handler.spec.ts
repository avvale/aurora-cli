import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteAdministrativeAreaLevel1ByIdCommandHandler } from './common-delete-administrative-area-level-1-by-id.command-handler';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1/infrastructure/mock/common-mock-administrative-area-level-1.data';
import { CommonDeleteAdministrativeAreaLevel1ByIdCommand } from './common-delete-administrative-area-level-1-by-id.command';
import { CommonDeleteAdministrativeAreaLevel1ByIdService } from './common-delete-administrative-area-level-1-by-id.service';

describe('CommonDeleteAdministrativeAreaLevel1ByIdCommandHandler', () =>
{
    let commandHandler: CommonDeleteAdministrativeAreaLevel1ByIdCommandHandler;
    let service: CommonDeleteAdministrativeAreaLevel1ByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteAdministrativeAreaLevel1ByIdCommandHandler,
                {
                    provide : CommonDeleteAdministrativeAreaLevel1ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteAdministrativeAreaLevel1ByIdCommandHandler>(CommonDeleteAdministrativeAreaLevel1ByIdCommandHandler);
        service = module.get<CommonDeleteAdministrativeAreaLevel1ByIdService>(CommonDeleteAdministrativeAreaLevel1ByIdService);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreaLevel1ByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the CommonDeleteAdministrativeAreaLevel1ByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteAdministrativeAreaLevel1ByIdCommand(
                    commonMockAdministrativeAreaLevel1Data[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
