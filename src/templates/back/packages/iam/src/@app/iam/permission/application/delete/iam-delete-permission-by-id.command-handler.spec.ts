import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeletePermissionByIdCommandHandler } from './iam-delete-permission-by-id.command-handler';
import { iamMockPermissionData } from '@app/iam/permission/infrastructure/mock/iam-mock-permission.data';
import { IamDeletePermissionByIdCommand } from './iam-delete-permission-by-id.command';
import { IamDeletePermissionByIdService } from './iam-delete-permission-by-id.service';

describe('IamDeletePermissionByIdCommandHandler', () =>
{
    let commandHandler: IamDeletePermissionByIdCommandHandler;
    let service: IamDeletePermissionByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeletePermissionByIdCommandHandler,
                {
                    provide : IamDeletePermissionByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeletePermissionByIdCommandHandler>(IamDeletePermissionByIdCommandHandler);
        service = module.get<IamDeletePermissionByIdService>(IamDeletePermissionByIdService);
    });

    describe('main', () =>
    {
        test('IamDeletePermissionByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the IamDeletePermissionByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeletePermissionByIdCommand(
                    iamMockPermissionData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
