import { iamMockPermissionData, IamUpdateAndIncrementPermissionsCommand } from '@app/iam/permission';
import { IamUpdateAndIncrementPermissionsCommandHandler } from '@app/iam/permission/application/update/iam-update-and-increment-permissions.command-handler';
import { IamUpdateAndIncrementPermissionsService } from '@app/iam/permission/application/update/iam-update-and-increment-permissions.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementPermissionsCommandHandler', () =>
{
    let commandHandler: IamUpdateAndIncrementPermissionsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateAndIncrementPermissionsCommandHandler,
                {
                    provide : IamUpdateAndIncrementPermissionsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateAndIncrementPermissionsCommandHandler>(IamUpdateAndIncrementPermissionsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementPermissionsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an permissions updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new IamUpdateAndIncrementPermissionsCommand(
                    {
                        id: iamMockPermissionData[0].id,
                        name: iamMockPermissionData[0].name,
                        boundedContextId: iamMockPermissionData[0].boundedContextId,
                        roleIds: iamMockPermissionData[0].roleIds,
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
