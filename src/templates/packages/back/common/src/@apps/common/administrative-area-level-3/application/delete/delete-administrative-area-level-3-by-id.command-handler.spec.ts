import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAdministrativeAreaLevel3ByIdCommandHandler } from './delete-administrative-area-level-3-by-id.command-handler';
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';
import { DeleteAdministrativeAreaLevel3ByIdCommand } from './delete-administrative-area-level-3-by-id.command';
import { DeleteAdministrativeAreaLevel3ByIdService } from './delete-administrative-area-level-3-by-id.service';

describe('DeleteAdministrativeAreaLevel3ByIdCommandHandler', () =>
{
    let commandHandler: DeleteAdministrativeAreaLevel3ByIdCommandHandler;
    let service: DeleteAdministrativeAreaLevel3ByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAdministrativeAreaLevel3ByIdCommandHandler,
                {
                    provide : DeleteAdministrativeAreaLevel3ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<DeleteAdministrativeAreaLevel3ByIdCommandHandler>(DeleteAdministrativeAreaLevel3ByIdCommandHandler);
        service         = module.get<DeleteAdministrativeAreaLevel3ByIdService>(DeleteAdministrativeAreaLevel3ByIdService);
    });

    describe('main', () =>
    {
        test('DeleteAdministrativeAreaLevel3ByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteAdministrativeAreaLevel3ByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteAdministrativeAreaLevel3ByIdCommand(
                    administrativeAreasLevel3[0].id,
                ),
            )).toBe(undefined);
        });
    });
});