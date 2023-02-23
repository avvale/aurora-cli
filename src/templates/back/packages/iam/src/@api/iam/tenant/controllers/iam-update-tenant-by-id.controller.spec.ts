/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateTenantByIdController } from './iam-update-tenant-by-id.controller';
import { IamUpdateTenantByIdHandler } from '../handlers/iam-update-tenant-by-id.handler';

// sources
import { tenants } from '@app/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamUpdateTenantByIdController', () =>
{
    let controller: IamUpdateTenantByIdController;
    let handler: IamUpdateTenantByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateTenantByIdController,
            ],
            providers: [
                {
                    provide : IamUpdateTenantByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdateTenantByIdController>(IamUpdateTenantByIdController);
        handler = module.get<IamUpdateTenantByIdHandler>(IamUpdateTenantByIdHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateTenantByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a tenant updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await controller.main(tenants[0])).toBe(tenants[0]);
        });
    });
});