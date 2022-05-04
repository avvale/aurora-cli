/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteTenantByIdController } from './iam-delete-tenant-by-id.controller';
import { IamDeleteTenantByIdHandler } from '../handlers/iam-delete-tenant-by-id.handler';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamDeleteTenantByIdController', () =>
{
    let controller: IamDeleteTenantByIdController;
    let handler: IamDeleteTenantByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamDeleteTenantByIdController,
            ],
            providers: [
                {
                    provide : IamDeleteTenantByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeleteTenantByIdController>(IamDeleteTenantByIdController);
        handler = module.get<IamDeleteTenantByIdHandler>(IamDeleteTenantByIdHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteTenantByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an tenant deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await controller.main(tenants[0].id)).toBe(tenants[0]);
        });
    });
});