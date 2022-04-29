/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindTenantController } from './iam-find-tenant.controller';
import { IamFindTenantHandler } from '../handlers/iam-find-tenant.handler';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamFindTenantController', () =>
{
    let controller: IamFindTenantController;
    let handler: IamFindTenantHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindTenantController,
            ],
            providers: [
                {
                    provide : IamFindTenantHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamFindTenantController>(IamFindTenantController);
        handler = module.get<IamFindTenantHandler>(IamFindTenantHandler);
    });

    describe('main', () =>
    {
        test('IamFindTenantController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a tenant', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await controller.main()).toBe(tenants[0]);
        });
    });
});