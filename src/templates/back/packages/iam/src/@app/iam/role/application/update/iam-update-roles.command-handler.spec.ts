import { iamMockRoleData, IamUpdateRolesCommand } from '@app/iam/role';
import { IamUpdateRolesCommandHandler } from '@app/iam/role/application/update/iam-update-roles.command-handler';
import { IamUpdateRolesService } from '@app/iam/role/application/update/iam-update-roles.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRolesCommandHandler', () => {
    let commandHandler: IamUpdateRolesCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateRolesCommandHandler,
                {
                    provide: IamUpdateRolesService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamUpdateRolesCommandHandler>(
            IamUpdateRolesCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdateRolesCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an roles updated', async () => {
            expect(
                await commandHandler.execute(
                    new IamUpdateRolesCommand(
                        {
                            id: iamMockRoleData[0].id,
                            rowId: iamMockRoleData[0].rowId,
                            name: iamMockRoleData[0].name,
                            defaultRedirection:
                                iamMockRoleData[0].defaultRedirection,
                            hasHiddenVerticalNavigation:
                                iamMockRoleData[0].hasHiddenVerticalNavigation,
                            isMaster: iamMockRoleData[0].isMaster,
                            permissionIds: iamMockRoleData[0].permissionIds,
                            accountIds: iamMockRoleData[0].accountIds,
                        },
                        {},
                        {},
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
