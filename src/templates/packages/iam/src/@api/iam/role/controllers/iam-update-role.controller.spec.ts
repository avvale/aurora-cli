/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateRoleController } from './iam-update-role.controller';
import { IamUpdateRoleHandler } from '../handlers/iam-update-role.handler';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamUpdateRoleController', () =>
{
    let controller: IamUpdateRoleController;
    let handler: IamUpdateRoleHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateRoleController,
            ],
            providers: [
                {
                    provide : IamUpdateRoleHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamUpdateRoleController>(IamUpdateRoleController);
        handler = module.get<IamUpdateRoleHandler>(IamUpdateRoleHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateRoleController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a role created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await controller.main(roles[0])).toBe(roles[0]);
        });
    });
});