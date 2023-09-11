import { IamCreatePermissionCommandHandler } from './iam-create-permission.command-handler';
import { IamCreatePermissionService } from './iam-create-permission.service';
import { IamCreatePermissionCommand, iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreatePermissionCommandHandler', () =>
{
    let commandHandler: IamCreatePermissionCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreatePermissionCommandHandler,
                {
                    provide : IamCreatePermissionService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamCreatePermissionCommandHandler>(IamCreatePermissionCommandHandler);
    });

    describe('main', () =>
    {
        test('CreatePermissionCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the IamCreatePermissionService', async () =>
        {
            expect(await commandHandler.execute(
                new IamCreatePermissionCommand(
                    {
                        id: iamMockPermissionData[0].id,
                        name: iamMockPermissionData[0].name,
                        boundedContextId: iamMockPermissionData[0].boundedContextId,
                        roleIds: iamMockPermissionData[0].roleIds,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
