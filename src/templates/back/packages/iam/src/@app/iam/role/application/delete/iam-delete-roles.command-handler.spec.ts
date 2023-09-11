import { IamDeleteRolesCommand } from '@app/iam/role';
import { IamDeleteRolesCommandHandler } from '@app/iam/role/application/delete/iam-delete-roles.command-handler';
import { IamDeleteRolesService } from '@app/iam/role/application/delete/iam-delete-roles.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRolesCommandHandler', () =>
{
    let commandHandler: IamDeleteRolesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteRolesCommandHandler,
                {
                    provide : IamDeleteRolesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteRolesCommandHandler>(IamDeleteRolesCommandHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteRolesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteRolesCommand(),
            )).toBe(undefined);
        });
    });
});
