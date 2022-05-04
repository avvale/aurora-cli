/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateTenantController } from './iam-update-tenant.controller';
import { IamUpdateTenantHandler } from '../handlers/iam-update-tenant.handler';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamUpdateTenantController', () =>
{
    let controller: IamUpdateTenantController;
    let handler: IamUpdateTenantHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateTenantController,
            ],
            providers: [
                {
                    provide : IamUpdateTenantHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamUpdateTenantController>(IamUpdateTenantController);
        handler = module.get<IamUpdateTenantHandler>(IamUpdateTenantHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateTenantController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a tenant created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await controller.main(tenants[0])).toBe(tenants[0]);
        });
    });
});