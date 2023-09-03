import { CommonDeleteAdministrativeAreasLevel1Command } from '@app/common/administrative-area-level-1';
import { CommonDeleteAdministrativeAreasLevel1CommandHandler } from '@app/common/administrative-area-level-1/application/delete/common-delete-administrative-areas-level-1.command-handler';
import { CommonDeleteAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/delete/common-delete-administrative-areas-level-1.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreasLevel1CommandHandler', () =>
{
    let commandHandler: CommonDeleteAdministrativeAreasLevel1CommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteAdministrativeAreasLevel1CommandHandler,
                {
                    provide : CommonDeleteAdministrativeAreasLevel1Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteAdministrativeAreasLevel1CommandHandler>(CommonDeleteAdministrativeAreasLevel1CommandHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreasLevel1CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteAdministrativeAreasLevel1Command(),
            )).toBe(undefined);
        });
    });
});
