import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteAdministrativeAreasLevel2CommandHandler } from './common-delete-administrative-areas-level-2.command-handler';
import { CommonDeleteAdministrativeAreasLevel2Command } from './common-delete-administrative-areas-level-2.command';
import { CommonDeleteAdministrativeAreasLevel2Service } from './common-delete-administrative-areas-level-2.service';

describe('CommonDeleteAdministrativeAreasLevel2CommandHandler', () =>
{
    let commandHandler: CommonDeleteAdministrativeAreasLevel2CommandHandler;
    let service: CommonDeleteAdministrativeAreasLevel2Service;

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
        service = module.get<CommonDeleteAdministrativeAreasLevel2Service>(CommonDeleteAdministrativeAreasLevel2Service);
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