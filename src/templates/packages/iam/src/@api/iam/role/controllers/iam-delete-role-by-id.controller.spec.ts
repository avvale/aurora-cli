/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteRoleByIdController } from './iam-delete-role-by-id.controller';
import { IamDeleteRoleByIdHandler } from '../handlers/iam-delete-role-by-id.handler';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamDeleteRoleByIdController', () =>
{
    let controller: IamDeleteRoleByIdController;
    let handler: IamDeleteRoleByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamDeleteRoleByIdController,
            ],
            providers: [
                {
                    provide : IamDeleteRoleByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeleteRoleByIdController>(IamDeleteRoleByIdController);
        handler = module.get<IamDeleteRoleByIdHandler>(IamDeleteRoleByIdHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteRoleByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an role deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await controller.main(roles[0].id)).toBe(roles[0]);
        });
    });
});