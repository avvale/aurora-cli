import { CommonDeleteAdministrativeAreasLevel2Command } from '@app/common/administrative-area-level-2';
import { CommonDeleteAdministrativeAreasLevel2CommandHandler } from '@app/common/administrative-area-level-2/application/delete/common-delete-administrative-areas-level-2.command-handler';
import { CommonDeleteAdministrativeAreasLevel2Service } from '@app/common/administrative-area-level-2/application/delete/common-delete-administrative-areas-level-2.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreasLevel2CommandHandler', () =>
{
    let commandHandler: CommonDeleteAdministrativeAreasLevel2CommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteAdministrativeAreasLevel2CommandHandler,
                {
                    provide : CommonDeleteAdministrativeAreasLevel2Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteAdministrativeAreasLevel2CommandHandler>(CommonDeleteAdministrativeAreasLevel2CommandHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreasLevel2CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteAdministrativeAreasLevel2Command(),
            )).toBe(undefined);
        });
    });
});
