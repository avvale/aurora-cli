import { IamDeletePermissionsRolesCommand } from '@app/iam/permission-role';
import { IamDeletePermissionsRolesCommandHandler } from '@app/iam/permission-role/application/delete/iam-delete-permissions-roles.command-handler';
import { IamDeletePermissionsRolesService } from '@app/iam/permission-role/application/delete/iam-delete-permissions-roles.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionsRolesCommandHandler', () => {
    let commandHandler: IamDeletePermissionsRolesCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeletePermissionsRolesCommandHandler,
                {
                    provide: IamDeletePermissionsRolesService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamDeletePermissionsRolesCommandHandler>(
            IamDeletePermissionsRolesCommandHandler,
        );
    });

    describe('main', () => {
        test('IamDeletePermissionsRolesCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => {
            expect(
                await commandHandler.execute(
                    new IamDeletePermissionsRolesCommand(),
                ),
            ).toBe(undefined);
        });
    });
});
