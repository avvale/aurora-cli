/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteTenantsController } from './iam-delete-tenants.controller';
import { IamDeleteTenantsHandler } from '../handlers/iam-delete-tenants.handler';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamDeleteTenantsController', () =>
{
    let controller: IamDeleteTenantsController;
    let handler: IamDeleteTenantsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamDeleteTenantsController,
            ],
            providers: [
                {
                    provide : IamDeleteTenantsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeleteTenantsController>(IamDeleteTenantsController);
        handler = module.get<IamDeleteTenantsHandler>(IamDeleteTenantsHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteTenantsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an tenants deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants)));
            expect(await controller.main()).toBe(tenants);
        });
    });
});