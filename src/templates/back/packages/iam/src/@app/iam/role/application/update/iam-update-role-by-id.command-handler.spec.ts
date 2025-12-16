import { iamMockRoleData, IamUpdateRoleByIdCommand } from '@app/iam/role';
import { IamUpdateRoleByIdCommandHandler } from '@app/iam/role/application/update/iam-update-role-by-id.command-handler';
import { IamUpdateRoleByIdService } from '@app/iam/role/application/update/iam-update-role-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRoleByIdCommandHandler', () => {
    let commandHandler: IamUpdateRoleByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateRoleByIdCommandHandler,
                {
                    provide: IamUpdateRoleByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamUpdateRoleByIdCommandHandler>(
            IamUpdateRoleByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdateRoleByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an role created', async () => {
            expect(
                await commandHandler.execute(
                    new IamUpdateRoleByIdCommand(
                        {
                            id: iamMockRoleData[0].id,
                            rowId: iamMockRoleData[0].rowId,
                            name: iamMockRoleData[0].name,
                            defaultRedirection:
                                iamMockRoleData[0].defaultRedirection,
                            isMaster: iamMockRoleData[0].isMaster,
                            permissionIds: iamMockRoleData[0].permissionIds,
                            accountIds: iamMockRoleData[0].accountIds,
                        },
                        {},
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
