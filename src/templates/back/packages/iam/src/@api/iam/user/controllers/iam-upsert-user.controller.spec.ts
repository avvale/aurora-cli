import { IamUpsertUserController, IamUpsertUserHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertUserController', () =>
{
    let controller: IamUpsertUserController;
    let handler: IamUpsertUserHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpsertUserController,
            ],
            providers: [
                {
                    provide : IamUpsertUserHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpsertUserController>(IamUpsertUserController);
        handler = module.get<IamUpsertUserHandler>(IamUpsertUserHandler);
    });

    describe('main', () =>
    {
        test('IamUpsertUserController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an user upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockUserData[0])));
            expect(await controller.main(iamMockUserData[0])).toBe(iamMockUserData[0]);
        });
    });
});
