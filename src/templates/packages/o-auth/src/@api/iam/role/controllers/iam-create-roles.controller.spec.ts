import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateRolesController } from './iam-create-roles.controller';
import { IamCreateRolesHandler } from '../handlers/iam-create-roles.handler';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamCreateRolesController', () =>
{
    let controller: IamCreateRolesController;
    let handler: IamCreateRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamCreateRolesController,
            ],
            providers: [
                {
                    provide : IamCreateRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamCreateRolesController>(IamCreateRolesController);
        handler = module.get<IamCreateRolesHandler>(IamCreateRolesHandler);
    });

    describe('main', () =>
    {
        test('IamCreateRolesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an roles created', async () =>
        {
            expect(await controller.main(roles)).toBe(undefined);
        });
    });
});