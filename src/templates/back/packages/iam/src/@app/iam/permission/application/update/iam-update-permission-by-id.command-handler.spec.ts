import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockPermissionData } from '@app/iam/permission/infrastructure/mock/iam-mock-permission.data';
import { IamUpdatePermissionByIdCommandHandler } from './iam-update-permission-by-id.command-handler';
import { IamUpdatePermissionByIdCommand } from './iam-update-permission-by-id.command';
import { IamUpdatePermissionByIdService } from './iam-update-permission-by-id.service';

describe('IamUpdatePermissionByIdCommandHandler', () =>
{
    let commandHandler: IamUpdatePermissionByIdCommandHandler;
    let service: IamUpdatePermissionByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdatePermissionByIdCommandHandler,
                {
                    provide : IamUpdatePermissionByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdatePermissionByIdCommandHandler>(IamUpdatePermissionByIdCommandHandler);
        service = module.get<IamUpdatePermissionByIdService>(IamUpdatePermissionByIdService);
    });

    describe('main', () =>
    {
        test('UpdatePermissionByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an permission created', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpdatePermissionByIdCommand(
                    {
                        id: iamMockPermissionData[0].id,
                        name: iamMockPermissionData[0].name,
                        boundedContextId: iamMockPermissionData[0].boundedContextId,
                        roleIds: iamMockPermissionData[0].roleIds,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
