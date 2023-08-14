import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockTenantData } from '@app/iam/tenant/infrastructure/mock/iam-mock-tenant.data';
import { IamUpdateTenantByIdCommandHandler } from './iam-update-tenant-by-id.command-handler';
import { IamUpdateTenantByIdCommand } from './iam-update-tenant-by-id.command';
import { IamUpdateTenantByIdService } from './iam-update-tenant-by-id.service';

describe('IamUpdateTenantByIdCommandHandler', () =>
{
    let commandHandler: IamUpdateTenantByIdCommandHandler;
    let service: IamUpdateTenantByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateTenantByIdCommandHandler,
                {
                    provide : IamUpdateTenantByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateTenantByIdCommandHandler>(IamUpdateTenantByIdCommandHandler);
        service = module.get<IamUpdateTenantByIdService>(IamUpdateTenantByIdService);
    });

    describe('main', () =>
    {
        test('UpdateTenantByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an tenant created', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpdateTenantByIdCommand(
                    {
                        id: iamMockTenantData[0].id,
                        name: iamMockTenantData[0].name,
                        code: iamMockTenantData[0].code,
                        logo: iamMockTenantData[0].logo,
                        isActive: iamMockTenantData[0].isActive,
                        meta: iamMockTenantData[0].meta,
                        accountIds: iamMockTenantData[0].accountIds,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
