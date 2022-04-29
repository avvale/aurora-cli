/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindRoleByIdController } from './iam-find-role-by-id.controller';
import { IamFindRoleByIdHandler } from '../handlers/iam-find-role-by-id.handler';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamFindRoleByIdController', () =>
{
    let controller: IamFindRoleByIdController;
    let handler: IamFindRoleByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindRoleByIdController,
            ],
            providers: [
                {
                    provide : IamFindRoleByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamFindRoleByIdController>(IamFindRoleByIdController);
        handler = module.get<IamFindRoleByIdHandler>(IamFindRoleByIdHandler);
    });

    describe('main', () =>
    {
        test('IamFindRoleByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an role by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await controller.main(roles[0].id)).toBe(roles[0]);
        });
    });
});