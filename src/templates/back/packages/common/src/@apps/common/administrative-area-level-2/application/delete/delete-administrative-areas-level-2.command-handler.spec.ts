import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAdministrativeAreasLevel2CommandHandler } from './delete-administrative-areas-level-2.command-handler';
import { DeleteAdministrativeAreasLevel2Command } from './delete-administrative-areas-level-2.command';
import { DeleteAdministrativeAreasLevel2Service } from './delete-administrative-areas-level-2.service';

describe('DeleteAdministrativeAreasLevel2CommandHandler', () =>
{
    let commandHandler: DeleteAdministrativeAreasLevel2CommandHandler;
    let service: DeleteAdministrativeAreasLevel2Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAdministrativeAreasLevel2CommandHandler,
                {
                    provide : DeleteAdministrativeAreasLevel2Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<DeleteAdministrativeAreasLevel2CommandHandler>(DeleteAdministrativeAreasLevel2CommandHandler);
        service         = module.get<DeleteAdministrativeAreasLevel2Service>(DeleteAdministrativeAreasLevel2Service);
    });

    describe('main', () =>
    {
        test('DeleteAdministrativeAreasLevel2CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteAdministrativeAreasLevel2Command(),
            )).toBe(undefined);
        });
    });
});