import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteAdministrativeAreasLevel1CommandHandler } from './common-delete-administrative-areas-level-1.command-handler';
import { CommonDeleteAdministrativeAreasLevel1Command } from './common-delete-administrative-areas-level-1.command';
import { CommonDeleteAdministrativeAreasLevel1Service } from './common-delete-administrative-areas-level-1.service';

describe('CommonDeleteAdministrativeAreasLevel1CommandHandler', () =>
{
    let commandHandler: CommonDeleteAdministrativeAreasLevel1CommandHandler;
    let service: CommonDeleteAdministrativeAreasLevel1Service;

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
        service = module.get<CommonDeleteAdministrativeAreasLevel1Service>(CommonDeleteAdministrativeAreasLevel1Service);
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