import { CommonDeleteAdministrativeAreaLevel2ByIdCommand, commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { CommonDeleteAdministrativeAreaLevel2ByIdCommandHandler } from '@app/common/administrative-area-level-2/application/delete/common-delete-administrative-area-level-2-by-id.command-handler';
import { CommonDeleteAdministrativeAreaLevel2ByIdService } from '@app/common/administrative-area-level-2/application/delete/common-delete-administrative-area-level-2-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreaLevel2ByIdCommandHandler', () =>
{
    let commandHandler: CommonDeleteAdministrativeAreaLevel2ByIdCommandHandler;

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
