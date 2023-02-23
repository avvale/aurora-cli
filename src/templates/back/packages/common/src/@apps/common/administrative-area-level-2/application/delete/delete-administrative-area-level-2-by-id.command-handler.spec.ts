import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAdministrativeAreaLevel2ByIdCommandHandler } from './delete-administrative-area-level-2-by-id.command-handler';
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';
import { DeleteAdministrativeAreaLevel2ByIdCommand } from './delete-administrative-area-level-2-by-id.command';
import { DeleteAdministrativeAreaLevel2ByIdService } from './delete-administrative-area-level-2-by-id.service';

describe('DeleteAdministrativeAreaLevel2ByIdCommandHandler', () =>
{
    let commandHandler: DeleteAdministrativeAreaLevel2ByIdCommandHandler;
    let service: DeleteAdministrativeAreaLevel2ByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAdministrativeAreaLevel2ByIdCommandHandler,
                {
                    provide : DeleteAdministrativeAreaLevel2ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<DeleteAdministrativeAreaLevel2ByIdCommandHandler>(DeleteAdministrativeAreaLevel2ByIdCommandHandler);
        service         = module.get<DeleteAdministrativeAreaLevel2ByIdService>(DeleteAdministrativeAreaLevel2ByIdService);
    });

    describe('main', () =>
    {
        test('DeleteAdministrativeAreaLevel2ByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteAdministrativeAreaLevel2ByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteAdministrativeAreaLevel2ByIdCommand(
                    administrativeAreasLevel2[0].id,
                ),
            )).toBe(undefined);
        });
    });
});