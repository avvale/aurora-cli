/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateTenantController } from './iam-create-tenant.controller';
import { IamCreateTenantHandler } from '../handlers/iam-create-tenant.handler';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamCreateTenantController', () =>
{
    let controller: IamCreateTenantController;
    let handler: IamCreateTenantHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamCreateTenantController,
            ],
            providers: [
                {
                    provide : IamCreateTenantHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamCreateTenantController>(IamCreateTenantController);
        handler = module.get<IamCreateTenantHandler>(IamCreateTenantHandler);
    });

    describe('main', () =>
    {
        test('IamCreateTenantController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an tenant created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await controller.main(tenants[0])).toBe(tenants[0]);
        });
    });
});