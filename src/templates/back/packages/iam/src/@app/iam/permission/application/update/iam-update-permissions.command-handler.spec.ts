import {
    iamMockPermissionData,
    IamUpdatePermissionsCommand,
} from '@app/iam/permission';
import { IamUpdatePermissionsCommandHandler } from '@app/iam/permission/application/update/iam-update-permissions.command-handler';
import { IamUpdatePermissionsService } from '@app/iam/permission/application/update/iam-update-permissions.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionsCommandHandler', () => {
    let commandHandler: IamUpdatePermissionsCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdatePermissionsCommandHandler,
                {
                    provide: IamUpdatePermissionsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamUpdatePermissionsCommandHandler>(
            IamUpdatePermissionsCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdatePermissionsCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an permissions updated', async () => {
            expect(
                await commandHandler.execute(
                    new IamUpdatePermissionsCommand(
                        {
                            id: iamMockPermissionData[0].id,
                            rowId: iamMockPermissionData[0].rowId,
                            name: iamMockPermissionData[0].name,
                            boundedContextId:
                                iamMockPermissionData[0].boundedContextId,
                            roleIds: iamMockPermissionData[0].roleIds,
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
