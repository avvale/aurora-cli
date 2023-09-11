import { IamCreatePermissionsCommand, iamMockPermissionData } from '@app/iam/permission';
import { IamCreatePermissionsCommandHandler } from '@app/iam/permission/application/create/iam-create-permissions.command-handler';
import { IamCreatePermissionsService } from '@app/iam/permission/application/create/iam-create-permissions.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('iamCreatePermissionsCommandHandler', () =>
{
    let commandHandler: IamCreatePermissionsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreatePermissionsCommandHandler,
                {
                    provide : IamCreatePermissionsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamCreatePermissionsCommandHandler>(IamCreatePermissionsCommandHandler);
    });

    describe('main', () =>
    {
        test('IamCreatePermissionsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return IamMockPermissionData created', async () =>
        {
            expect(await commandHandler.execute(
                new IamCreatePermissionsCommand(
                    iamMockPermissionData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
