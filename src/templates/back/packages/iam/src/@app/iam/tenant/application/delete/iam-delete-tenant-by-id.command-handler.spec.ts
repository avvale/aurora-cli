import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteTenantByIdCommandHandler } from './iam-delete-tenant-by-id.command-handler';
import { iamMockTenantData } from '@app/iam/tenant/infrastructure/mock/iam-mock-tenant.data';
import { IamDeleteTenantByIdCommand } from './iam-delete-tenant-by-id.command';
import { IamDeleteTenantByIdService } from './iam-delete-tenant-by-id.service';

describe('IamDeleteTenantByIdCommandHandler', () =>
{
    let commandHandler: IamDeleteTenantByIdCommandHandler;
    let service: IamDeleteTenantByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteTenantByIdCommandHandler,
                {
                    provide : IamDeleteTenantByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteTenantByIdCommandHandler>(IamDeleteTenantByIdCommandHandler);
        service = module.get<IamDeleteTenantByIdService>(IamDeleteTenantByIdService);
    });

    describe('main', () =>
    {
        test('IamDeleteTenantByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the IamDeleteTenantByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteTenantByIdCommand(
                    iamMockTenantData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
