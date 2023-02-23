/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpsertRoleController } from './iam-upsert-role.controller';
import { IamUpsertRoleHandler } from '../handlers/iam-upsert-role.handler';

// sources
import { roles } from '@app/iam/role/infrastructure/seeds/role.seed';

describe('IamUpsertRoleController', () =>
{
    let controller: IamUpsertRoleController;
    let handler: IamUpsertRoleHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpsertRoleController,
            ],
            providers: [
                {
                    provide : IamUpsertRoleHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpsertRoleController>(IamUpsertRoleController);
        handler = module.get<IamUpsertRoleHandler>(IamUpsertRoleHandler);
    });

    describe('main', () =>
    {
        test('IamUpsertRoleController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an role upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await controller.main(roles[0])).toBe(roles[0]);
        });
    });
});