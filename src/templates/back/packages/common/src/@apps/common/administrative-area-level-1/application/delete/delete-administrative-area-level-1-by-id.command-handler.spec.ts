import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAdministrativeAreaLevel1ByIdCommandHandler } from './delete-administrative-area-level-1-by-id.command-handler';
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';
import { DeleteAdministrativeAreaLevel1ByIdCommand } from './delete-administrative-area-level-1-by-id.command';
import { DeleteAdministrativeAreaLevel1ByIdService } from './delete-administrative-area-level-1-by-id.service';

describe('DeleteAdministrativeAreaLevel1ByIdCommandHandler', () =>
{
    let commandHandler: DeleteAdministrativeAreaLevel1ByIdCommandHandler;
    let service: DeleteAdministrativeAreaLevel1ByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAdministrativeAreaLevel1ByIdCommandHandler,
                {
                    provide : DeleteAdministrativeAreaLevel1ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<DeleteAdministrativeAreaLevel1ByIdCommandHandler>(DeleteAdministrativeAreaLevel1ByIdCommandHandler);
        service         = module.get<DeleteAdministrativeAreaLevel1ByIdService>(DeleteAdministrativeAreaLevel1ByIdService);
    });

    describe('main', () =>
    {
        test('DeleteAdministrativeAreaLevel1ByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteAdministrativeAreaLevel1ByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteAdministrativeAreaLevel1ByIdCommand(
                    administrativeAreasLevel1[0].id,
                ),
            )).toBe(undefined);
        });
    });
});