import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAdministrativeAreasLevel1CommandHandler } from './delete-administrative-areas-level-1.command-handler';
import { DeleteAdministrativeAreasLevel1Command } from './delete-administrative-areas-level-1.command';
import { DeleteAdministrativeAreasLevel1Service } from './delete-administrative-areas-level-1.service';

describe('DeleteAdministrativeAreasLevel1CommandHandler', () =>
{
    let commandHandler: DeleteAdministrativeAreasLevel1CommandHandler;
    let service: DeleteAdministrativeAreasLevel1Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAdministrativeAreasLevel1CommandHandler,
                {
                    provide : DeleteAdministrativeAreasLevel1Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<DeleteAdministrativeAreasLevel1CommandHandler>(DeleteAdministrativeAreasLevel1CommandHandler);
        service         = module.get<DeleteAdministrativeAreasLevel1Service>(DeleteAdministrativeAreasLevel1Service);
    });

    describe('main', () =>
    {
        test('DeleteAdministrativeAreasLevel1CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteAdministrativeAreasLevel1Command(),
            )).toBe(undefined);
        });
    });
});