/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateRolesController } from './iam-update-roles.controller';
import { IamUpdateRolesHandler } from '../handlers/iam-update-roles.handler';

// sources
import { roles } from '@app/iam/role/infrastructure/seeds/role.seed';

describe('IamUpdateRolesController', () =>
{
    let controller: IamUpdateRolesController;
    let handler: IamUpdateRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateRolesController,
            ],
            providers: [
                {
                    provide : IamUpdateRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdateRolesController>(IamUpdateRolesController);
        handler = module.get<IamUpdateRolesHandler>(IamUpdateRolesHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateRolesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a roles updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await controller.main(roles[0])).toBe(roles[0]);
        });
    });
});