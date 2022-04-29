import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteRoleByIdCommandHandler } from './delete-role-by-id.command-handler';
import { roles } from '../../../../../@apps/iam/role/infrastructure/seeds/role.seed';
import { DeleteRoleByIdCommand } from './delete-role-by-id.command';
import { DeleteRoleByIdService } from './delete-role-by-id.service';

describe('DeleteRoleByIdCommandHandler', () =>
{
    let commandHandler: DeleteRoleByIdCommandHandler;
    let service: DeleteRoleByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteRoleByIdCommandHandler,
                {
                    provide: DeleteRoleByIdService,
                    useValue: {
                        main: () => {},
                    }
                },
            ],
        }).compile();

        commandHandler  = module.get<DeleteRoleByIdCommandHandler>(DeleteRoleByIdCommandHandler);
        service         = module.get<DeleteRoleByIdService>(DeleteRoleByIdService);
    });

    describe('main', () =>
    {
        test('DeleteRoleByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteRoleByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteRoleByIdCommand(
                    roles[0].id,
                )
            )).toBe(undefined);
        });
    });
});