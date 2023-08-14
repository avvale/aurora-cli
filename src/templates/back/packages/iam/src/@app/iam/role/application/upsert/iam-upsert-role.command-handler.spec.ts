import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockRoleData } from '@app/iam/role/infrastructure/mock/iam-mock-role.data';
import { IamUpsertRoleCommandHandler } from './iam-upsert-role.command-handler';
import { IamUpsertRoleCommand } from './iam-upsert-role.command';
import { IamUpsertRoleService } from './iam-upsert-role.service';

describe('IamUpsertRoleCommandHandler', () =>
{
    let commandHandler: IamUpsertRoleCommandHandler;
    let service: IamUpsertRoleService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpsertRoleCommandHandler,
                {
                    provide : IamUpsertRoleService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpsertRoleCommandHandler>(IamUpsertRoleCommandHandler);
        service = module.get<IamUpsertRoleService>(IamUpsertRoleService);
    });

    describe('main', () =>
    {
        test('UpsertRoleCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the IamUpsertRoleService', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpsertRoleCommand(
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
