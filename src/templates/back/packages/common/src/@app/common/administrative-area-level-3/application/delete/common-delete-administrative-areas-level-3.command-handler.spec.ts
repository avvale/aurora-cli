import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteAdministrativeAreasLevel3CommandHandler } from './common-delete-administrative-areas-level-3.command-handler';
import { CommonDeleteAdministrativeAreasLevel3Command } from './common-delete-administrative-areas-level-3.command';
import { CommonDeleteAdministrativeAreasLevel3Service } from './common-delete-administrative-areas-level-3.service';

describe('CommonDeleteAdministrativeAreasLevel3CommandHandler', () =>
{
    let commandHandler: CommonDeleteAdministrativeAreasLevel3CommandHandler;
    let service: CommonDeleteAdministrativeAreasLevel3Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteAdministrativeAreasLevel3CommandHandler,
                {
                    provide : CommonDeleteAdministrativeAreasLevel3Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteAdministrativeAreasLevel3CommandHandler>(CommonDeleteAdministrativeAreasLevel3CommandHandler);
        service = module.get<CommonDeleteAdministrativeAreasLevel3Service>(CommonDeleteAdministrativeAreasLevel3Service);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreasLevel3CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteAdministrativeAreasLevel3Command(),
            )).toBe(undefined);
        });
    });
});