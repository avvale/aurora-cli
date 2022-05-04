/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindTenantByIdController } from './iam-find-tenant-by-id.controller';
import { IamFindTenantByIdHandler } from '../handlers/iam-find-tenant-by-id.handler';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamFindTenantByIdController', () =>
{
    let controller: IamFindTenantByIdController;
    let handler: IamFindTenantByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindTenantByIdController,
            ],
            providers: [
                {
                    provide : IamFindTenantByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamFindTenantByIdController>(IamFindTenantByIdController);
        handler = module.get<IamFindTenantByIdHandler>(IamFindTenantByIdHandler);
    });

    describe('main', () =>
    {
        test('IamFindTenantByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an tenant by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await controller.main(tenants[0].id)).toBe(tenants[0]);
        });
    });
});