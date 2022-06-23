import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAdministrativeAreasLevel3CommandHandler } from './delete-administrative-areas-level-3.command-handler';
import { DeleteAdministrativeAreasLevel3Command } from './delete-administrative-areas-level-3.command';
import { DeleteAdministrativeAreasLevel3Service } from './delete-administrative-areas-level-3.service';

describe('DeleteAdministrativeAreasLevel3CommandHandler', () =>
{
    let commandHandler: DeleteAdministrativeAreasLevel3CommandHandler;
    let service: DeleteAdministrativeAreasLevel3Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAdministrativeAreasLevel3CommandHandler,
                {
                    provide : DeleteAdministrativeAreasLevel3Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<DeleteAdministrativeAreasLevel3CommandHandler>(DeleteAdministrativeAreasLevel3CommandHandler);
        service         = module.get<DeleteAdministrativeAreasLevel3Service>(DeleteAdministrativeAreasLevel3Service);
    });

    describe('main', () =>
    {
        test('DeleteAdministrativeAreasLevel3CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteAdministrativeAreasLevel3Command(),
            )).toBe(undefined);
        });
    });
});