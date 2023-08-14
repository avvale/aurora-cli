import { IamUpsertAccountController, IamUpsertAccountHandler } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertAccountController', () =>
{
    let controller: IamUpsertAccountController;
    let handler: IamUpsertAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpsertAccountController,
            ],
            providers: [
                {
                    provide : IamUpsertAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpsertAccountController>(IamUpsertAccountController);
        handler = module.get<IamUpsertAccountHandler>(IamUpsertAccountHandler);
    });

    describe('main', () =>
    {
        test('IamUpsertAccountController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an account upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockAccountData[0])));
            expect(await controller.main(iamMockAccountData[0])).toBe(iamMockAccountData[0]);
        });
    });
});
