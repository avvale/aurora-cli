/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateUserMetaByIdController } from './iam-update-user-meta-by-id.controller';
import { IamUpdateUserMetaByIdHandler } from '../handlers/iam-update-user-meta-by-id.handler';

// sources
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';

describe('IamUpdateUserByIdController', () =>
{
    let controller: IamUpdateUserMetaByIdController;
    let handler: IamUpdateUserMetaByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateUserMetaByIdController,
            ],
            providers: [
                {
                    provide : IamUpdateUserMetaByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdateUserMetaByIdController>(IamUpdateUserMetaByIdController);
        handler = module.get<IamUpdateUserMetaByIdHandler>(IamUpdateUserMetaByIdHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateUserByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a user created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await controller.main(users[0])).toBe(users[0]);
        });
    });
});