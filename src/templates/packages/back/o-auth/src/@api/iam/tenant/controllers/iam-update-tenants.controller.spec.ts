/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateTenantsController } from './iam-update-tenants.controller';
import { IamUpdateTenantsHandler } from '../handlers/iam-update-tenants.handler';

// sources
import { tenants } from '@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamUpdateTenantsController', () =>
{
    let controller: IamUpdateTenantsController;
    let handler: IamUpdateTenantsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateTenantsController,
            ],
            providers: [
                {
                    provide : IamUpdateTenantsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdateTenantsController>(IamUpdateTenantsController);
        handler = module.get<IamUpdateTenantsHandler>(IamUpdateTenantsHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateTenantsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a tenants updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await controller.main(tenants[0])).toBe(tenants[0]);
        });
    });
});