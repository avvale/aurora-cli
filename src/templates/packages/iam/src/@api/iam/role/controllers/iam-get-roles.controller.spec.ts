/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetRolesController } from './iam-get-roles.controller';
import { IamGetRolesHandler } from '../handlers/iam-get-roles.handler';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamGetRolesController', () =>
{
    let controller: IamGetRolesController;
    let handler: IamGetRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamGetRolesController,
            ],
            providers: [
                {
                    provide : IamGetRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamGetRolesController>(IamGetRolesController);
        handler = module.get<IamGetRolesHandler>(IamGetRolesHandler);
    });

    describe('main', () =>
    {
        test('IamGetRolesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a roles', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles)));
            expect(await controller.main()).toBe(roles);
        });
    });
});