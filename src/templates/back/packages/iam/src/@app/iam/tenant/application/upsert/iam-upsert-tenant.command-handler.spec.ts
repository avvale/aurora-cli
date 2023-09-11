import { iamMockTenantData, IamUpsertTenantCommand } from '@app/iam/tenant';
import { IamUpsertTenantCommandHandler } from '@app/iam/tenant/application/upsert/iam-upsert-tenant.command-handler';
import { IamUpsertTenantService } from '@app/iam/tenant/application/upsert/iam-upsert-tenant.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertTenantCommandHandler', () =>
{
    let commandHandler: IamUpsertTenantCommandHandler;
    let service: IamUpsertTenantService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpsertTenantCommandHandler,
                {
                    provide : IamUpsertTenantService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpsertTenantCommandHandler>(IamUpsertTenantCommandHandler);
        service = module.get<IamUpsertTenantService>(IamUpsertTenantService);
    });

    describe('main', () =>
    {
        test('UpsertTenantCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the IamUpsertTenantService', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpsertTenantCommand(
                    {
                        id: iamMockTenantData[0].id,
                        name: iamMockTenantData[0].name,
                        code: iamMockTenantData[0].code,
                        logo: iamMockTenantData[0].logo,
                        isActive: iamMockTenantData[0].isActive,
                        meta: iamMockTenantData[0].meta,
                        accountIds: iamMockTenantData[0].accountIds,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
