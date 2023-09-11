import { iamMockPermissionData, IamUpsertPermissionCommand } from '@app/iam/permission';
import { IamUpsertPermissionCommandHandler } from '@app/iam/permission/application/upsert/iam-upsert-permission.command-handler';
import { IamUpsertPermissionService } from '@app/iam/permission/application/upsert/iam-upsert-permission.service';
import { Test, TestingModule } from '@nestjs/testing';

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
