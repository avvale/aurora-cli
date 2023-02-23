/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpsertTenantController } from './iam-upsert-tenant.controller';
import { IamUpsertTenantHandler } from '../handlers/iam-upsert-tenant.handler';

// sources
import { tenants } from '@app/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamUpsertTenantController', () =>
{
    let controller: IamUpsertTenantController;
    let handler: IamUpsertTenantHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpsertTenantController,
            ],
            providers: [
                {
                    provide : IamUpsertTenantHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpsertTenantController>(IamUpsertTenantController);
        handler = module.get<IamUpsertTenantHandler>(IamUpsertTenantHandler);
    });

    describe('main', () =>
    {
        test('IamUpsertTenantController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an tenant upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await controller.main(tenants[0])).toBe(tenants[0]);
        });
    });
});