import { iamMockRoleData, IamUpdateAndIncrementRolesCommand } from '@app/iam/role';
import { IamUpdateAndIncrementRolesCommandHandler } from '@app/iam/role/application/update/iam-update-and-increment-roles.command-handler';
import { IamUpdateAndIncrementRolesService } from '@app/iam/role/application/update/iam-update-and-increment-roles.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementRolesCommandHandler', () =>
{
    let commandHandler: IamUpdateAndIncrementRolesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateAndIncrementRolesCommandHandler,
                {
                    provide : IamUpdateAndIncrementRolesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateAndIncrementRolesCommandHandler>(IamUpdateAndIncrementRolesCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementRolesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an roles updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new IamUpdateAndIncrementRolesCommand(
                    {
                        id: iamMockRoleData[0].id,
                        name: iamMockRoleData[0].name,
                        isMaster: iamMockRoleData[0].isMaster,
                        permissionIds: iamMockRoleData[0].permissionIds,
                        accountIds: iamMockRoleData[0].accountIds,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
