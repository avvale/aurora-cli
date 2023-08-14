/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockPermissionData } from '@app/iam/permission/infrastructure/mock/iam-mock-permission.data';
import { IamCreatePermissionsCommandHandler } from './iam-create-permissions.command-handler';
import { IamCreatePermissionsCommand } from './iam-create-permissions.command';
import { IamCreatePermissionsService } from './iam-create-permissions.service';

describe('iamCreatePermissionsCommandHandler', () =>
{
    let commandHandler: IamCreatePermissionsCommandHandler;
    let service: IamCreatePermissionsService;

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
        service = module.get<IamCreatePermissionsService>(IamCreatePermissionsService);
    });

    describe('main', () =>
    {
        test('IamCreatePermissionsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return IamMockPermissionData createds', async () =>
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
