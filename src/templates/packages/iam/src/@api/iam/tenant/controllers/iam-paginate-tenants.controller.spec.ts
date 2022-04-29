/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamPaginateTenantsController } from './iam-paginate-tenants.controller';
import { IamPaginateTenantsHandler } from '../handlers/iam-paginate-tenants.handler';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamPaginateTenantsController', () =>
{
    let controller: IamPaginateTenantsController;
    let handler: IamPaginateTenantsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamPaginateTenantsController,
            ],
            providers: [
                {
                    provide : IamPaginateTenantsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ]
        }).compile();

        controller = module.get<IamPaginateTenantsController>(IamPaginateTenantsController);
        handler = module.get<IamPaginateTenantsHandler>(IamPaginateTenantsHandler);
    });

    describe('main', () =>
    {
        test('IamPaginateTenantsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a tenants', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : tenants,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : tenants,
            });
        });
    });
});