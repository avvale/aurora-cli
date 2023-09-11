import { IamDeleteRoleByIdCommand, iamMockRoleData } from '@app/iam/role';
import { IamDeleteRoleByIdCommandHandler } from '@app/iam/role/application/delete/iam-delete-role-by-id.command-handler';
import { IamDeleteRoleByIdService } from '@app/iam/role/application/delete/iam-delete-role-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRoleByIdCommandHandler', () =>
{
    let commandHandler: IamDeleteRoleByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteRoleByIdCommandHandler,
                {
                    provide : IamDeleteRoleByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteRoleByIdCommandHandler>(IamDeleteRoleByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteRoleByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the IamDeleteRoleByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteRoleByIdCommand(
                    iamMockRoleData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
