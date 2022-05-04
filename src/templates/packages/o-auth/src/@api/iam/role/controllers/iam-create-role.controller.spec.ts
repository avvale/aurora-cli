/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateRoleController } from './iam-create-role.controller';
import { IamCreateRoleHandler } from '../handlers/iam-create-role.handler';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamCreateRoleController', () =>
{
    let controller: IamCreateRoleController;
    let handler: IamCreateRoleHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamCreateRoleController,
            ],
            providers: [
                {
                    provide : IamCreateRoleHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamCreateRoleController>(IamCreateRoleController);
        handler = module.get<IamCreateRoleHandler>(IamCreateRoleHandler);
    });

    describe('main', () =>
    {
        test('IamCreateRoleController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an role created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await controller.main(roles[0])).toBe(roles[0]);
        });
    });
});