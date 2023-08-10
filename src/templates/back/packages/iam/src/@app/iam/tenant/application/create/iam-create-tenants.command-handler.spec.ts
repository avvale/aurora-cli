/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockTenantData } from '@app/iam/tenant/infrastructure/mock/iam-mock-tenant.data';
import { IamCreateTenantsCommandHandler } from './iam-create-tenants.command-handler';
import { IamCreateTenantsCommand } from './iam-create-tenants.command';
import { IamCreateTenantsService } from './iam-create-tenants.service';

describe('iamCreateTenantsCommandHandler', () =>
{
    let commandHandler: IamCreateTenantsCommandHandler;
    let service: IamCreateTenantsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateTenantsCommandHandler,
                {
                    provide : IamCreateTenantsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamCreateTenantsCommandHandler>(IamCreateTenantsCommandHandler);
        service = module.get<IamCreateTenantsService>(IamCreateTenantsService);
    });

    describe('main', () =>
    {
        test('IamCreateTenantsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return IamMockTenantData createds', async () =>
        {
            expect(await commandHandler.execute(
                new IamCreateTenantsCommand(
                    iamMockTenantData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
