/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetTenantsController } from './iam-get-tenants.controller';
import { IamGetTenantsHandler } from '../handlers/iam-get-tenants.handler';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamGetTenantsController', () =>
{
    let controller: IamGetTenantsController;
    let handler: IamGetTenantsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamGetTenantsController,
            ],
            providers: [
                {
                    provide : IamGetTenantsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamGetTenantsController>(IamGetTenantsController);
        handler = module.get<IamGetTenantsHandler>(IamGetTenantsHandler);
    });

    describe('main', () =>
    {
        test('IamGetTenantsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a tenants', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants)));
            expect(await controller.main()).toBe(tenants);
        });
    });
});