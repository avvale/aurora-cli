import { IamCreateRoleCommandHandler } from './iam-create-role.command-handler';
import { IamCreateRoleService } from './iam-create-role.service';
import { IamCreateRoleCommand, iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRoleCommandHandler', () =>
{
    let commandHandler: IamCreateRoleCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateRoleCommandHandler,
                {
                    provide : IamCreateRoleService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamCreateRoleCommandHandler>(IamCreateRoleCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateRoleCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the IamCreateRoleService', async () =>
        {
            expect(await commandHandler.execute(
                new IamCreateRoleCommand(
                    {
                        id: iamMockRoleData[0].id,
                        name: iamMockRoleData[0].name,
                        isMaster: iamMockRoleData[0].isMaster,
                        permissionIds: iamMockRoleData[0].permissionIds,
                        accountIds: iamMockRoleData[0].accountIds,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
