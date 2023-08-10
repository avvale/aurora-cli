import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockPermissionData } from '@app/iam/permission/infrastructure/mock/iam-mock-permission.data';
import { IamUpsertPermissionCommandHandler } from './iam-upsert-permission.command-handler';
import { IamUpsertPermissionCommand } from './iam-upsert-permission.command';
import { IamUpsertPermissionService } from './iam-upsert-permission.service';

describe('IamUpsertPermissionCommandHandler', () =>
{
    let commandHandler: IamUpsertPermissionCommandHandler;
    let service: IamUpsertPermissionService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpsertPermissionCommandHandler,
                {
                    provide : IamUpsertPermissionService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpsertPermissionCommandHandler>(IamUpsertPermissionCommandHandler);
        service = module.get<IamUpsertPermissionService>(IamUpsertPermissionService);
    });

    describe('main', () =>
    {
        test('UpsertPermissionCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the IamUpsertPermissionService', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpsertPermissionCommand(
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
