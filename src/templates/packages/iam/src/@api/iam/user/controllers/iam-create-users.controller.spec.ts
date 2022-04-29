import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateUsersController } from './iam-create-users.controller';
import { IamCreateUsersHandler } from '../handlers/iam-create-users.handler';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamCreateUsersController', () =>
{
    let controller: IamCreateUsersController;
    let handler: IamCreateUsersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamCreateUsersController,
            ],
            providers: [
                {
                    provide : IamCreateUsersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamCreateUsersController>(IamCreateUsersController);
        handler = module.get<IamCreateUsersHandler>(IamCreateUsersHandler);
    });

    describe('main', () =>
    {
        test('IamCreateUsersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an users created', async () =>
        {
            expect(await controller.main(users)).toBe(undefined);
        });
    });
});