import {
    IamDeletePermissionRoleByIdCommand,
    iamMockPermissionRoleData,
} from '@app/iam/permission-role';
import { IamDeletePermissionRoleByIdCommandHandler } from '@app/iam/permission-role/application/delete/iam-delete-permission-role-by-id.command-handler';
import { IamDeletePermissionRoleByIdService } from '@app/iam/permission-role/application/delete/iam-delete-permission-role-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionRoleByIdCommandHandler', () => {
    let commandHandler: IamDeletePermissionRoleByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeletePermissionRoleByIdCommandHandler,
                {
                    provide: IamDeletePermissionRoleByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamDeletePermissionRoleByIdCommandHandler>(
            IamDeletePermissionRoleByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('IamDeletePermissionRoleByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the IamDeletePermissionRoleByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new IamDeletePermissionRoleByIdCommand(
                        iamMockPermissionRoleData[0].id,
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
