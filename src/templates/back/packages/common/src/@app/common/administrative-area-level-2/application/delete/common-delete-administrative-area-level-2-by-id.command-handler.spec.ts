import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteAdministrativeAreaLevel2ByIdCommandHandler } from './common-delete-administrative-area-level-2-by-id.command-handler';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2/infrastructure/mock/common-mock-administrative-area-level-2.data';
import { CommonDeleteAdministrativeAreaLevel2ByIdCommand } from './common-delete-administrative-area-level-2-by-id.command';
import { CommonDeleteAdministrativeAreaLevel2ByIdService } from './common-delete-administrative-area-level-2-by-id.service';

describe('CommonDeleteAdministrativeAreaLevel2ByIdCommandHandler', () =>
{
    let commandHandler: CommonDeleteAdministrativeAreaLevel2ByIdCommandHandler;
    let service: CommonDeleteAdministrativeAreaLevel2ByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteAdministrativeAreaLevel2ByIdCommandHandler,
                {
                    provide : CommonDeleteAdministrativeAreaLevel2ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteAdministrativeAreaLevel2ByIdCommandHandler>(CommonDeleteAdministrativeAreaLevel2ByIdCommandHandler);
        service = module.get<CommonDeleteAdministrativeAreaLevel2ByIdService>(CommonDeleteAdministrativeAreaLevel2ByIdService);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreaLevel2ByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the CommonDeleteAdministrativeAreaLevel2ByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteAdministrativeAreaLevel2ByIdCommand(
                    commonMockAdministrativeAreaLevel2Data[0].id,
                ),
            )).toBe(undefined);
        });
    });
});