import { IamDeleteUsersCommand } from '@app/iam/user';
import { IamDeleteUsersCommandHandler } from '@app/iam/user/application/delete/iam-delete-users.command-handler';
import { IamDeleteUsersService } from '@app/iam/user/application/delete/iam-delete-users.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteUsersCommandHandler', () =>
{
    let commandHandler: IamDeleteUsersCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteUsersCommandHandler,
                {
                    provide : IamDeleteUsersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteUsersCommandHandler>(IamDeleteUsersCommandHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteUsersCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteUsersCommand(),
            )).toBe(undefined);
        });
    });
});
