/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateRoleByIdController } from './iam-update-role-by-id.controller';
import { IamUpdateRoleByIdHandler } from '../handlers/iam-update-role-by-id.handler';

// sources
import { roles } from '@app/iam/role/infrastructure/seeds/role.seed';

describe('IamUpdateRoleByIdController', () =>
{
    let controller: IamUpdateRoleByIdController;
    let handler: IamUpdateRoleByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateRoleByIdController,
            ],
            providers: [
                {
                    provide : IamUpdateRoleByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdateRoleByIdController>(IamUpdateRoleByIdController);
        handler = module.get<IamUpdateRoleByIdHandler>(IamUpdateRoleByIdHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateRoleByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a role updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await controller.main(roles[0])).toBe(roles[0]);
        });
    });
});