import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockRoleData } from '@app/iam/role/infrastructure/mock/iam-mock-role.data';
import { IamUpdateRoleByIdCommandHandler } from './iam-update-role-by-id.command-handler';
import { IamUpdateRoleByIdCommand } from './iam-update-role-by-id.command';
import { IamUpdateRoleByIdService } from './iam-update-role-by-id.service';

describe('IamUpdateRoleByIdCommandHandler', () =>
{
    let commandHandler: IamUpdateRoleByIdCommandHandler;
    let service: IamUpdateRoleByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateRoleByIdCommandHandler,
                {
                    provide : IamUpdateRoleByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateRoleByIdCommandHandler>(IamUpdateRoleByIdCommandHandler);
        service = module.get<IamUpdateRoleByIdService>(IamUpdateRoleByIdService);
    });

    describe('main', () =>
    {
        test('UpdateRoleByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an role created', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpdateRoleByIdCommand(
                    {
                        id: iamMockRoleData[0].id,
                        name: iamMockRoleData[0].name,
                        isMaster: iamMockRoleData[0].isMaster,
                        permissionIds: iamMockRoleData[0].permissionIds,
                        accountIds: iamMockRoleData[0].accountIds,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
