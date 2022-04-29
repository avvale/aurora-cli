import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteUserByIdCommandHandler } from './delete-user-by-id.command-handler';
import { users } from '../../../../../@apps/iam/user/infrastructure/seeds/user.seed';
import { DeleteUserByIdCommand } from './delete-user-by-id.command';
import { DeleteUserByIdService } from './delete-user-by-id.service';

describe('DeleteUserByIdCommandHandler', () =>
{
    let commandHandler: DeleteUserByIdCommandHandler;
    let service: DeleteUserByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteUserByIdCommandHandler,
                {
                    provide: DeleteUserByIdService,
                    useValue: {
                        main: () => {},
                    }
                },
            ],
        }).compile();

        commandHandler  = module.get<DeleteUserByIdCommandHandler>(DeleteUserByIdCommandHandler);
        service         = module.get<DeleteUserByIdService>(DeleteUserByIdService);
    });

    describe('main', () =>
    {
        test('DeleteUserByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteUserByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteUserByIdCommand(
                    users[0].id,
                )
            )).toBe(undefined);
        });
    });
});