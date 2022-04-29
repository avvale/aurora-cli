/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamPaginateRolesController } from './iam-paginate-roles.controller';
import { IamPaginateRolesHandler } from '../handlers/iam-paginate-roles.handler';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamPaginateRolesController', () =>
{
    let controller: IamPaginateRolesController;
    let handler: IamPaginateRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamPaginateRolesController,
            ],
            providers: [
                {
                    provide : IamPaginateRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ]
        }).compile();

        controller = module.get<IamPaginateRolesController>(IamPaginateRolesController);
        handler = module.get<IamPaginateRolesHandler>(IamPaginateRolesHandler);
    });

    describe('main', () =>
    {
        test('IamPaginateRolesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a roles', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : roles,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : roles,
            });
        });
    });
});