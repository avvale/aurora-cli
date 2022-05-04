/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteRolesController } from './iam-delete-roles.controller';
import { IamDeleteRolesHandler } from '../handlers/iam-delete-roles.handler';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamDeleteRolesController', () =>
{
    let controller: IamDeleteRolesController;
    let handler: IamDeleteRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamDeleteRolesController,
            ],
            providers: [
                {
                    provide : IamDeleteRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeleteRolesController>(IamDeleteRolesController);
        handler = module.get<IamDeleteRolesHandler>(IamDeleteRolesHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteRolesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an roles deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles)));
            expect(await controller.main()).toBe(roles);
        });
    });
});