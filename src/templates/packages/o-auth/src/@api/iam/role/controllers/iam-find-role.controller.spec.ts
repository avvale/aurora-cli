/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindRoleController } from './iam-find-role.controller';
import { IamFindRoleHandler } from '../handlers/iam-find-role.handler';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamFindRoleController', () =>
{
    let controller: IamFindRoleController;
    let handler: IamFindRoleHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindRoleController,
            ],
            providers: [
                {
                    provide : IamFindRoleHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamFindRoleController>(IamFindRoleController);
        handler = module.get<IamFindRoleHandler>(IamFindRoleHandler);
    });

    describe('main', () =>
    {
        test('IamFindRoleController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a role', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await controller.main()).toBe(roles[0]);
        });
    });
});