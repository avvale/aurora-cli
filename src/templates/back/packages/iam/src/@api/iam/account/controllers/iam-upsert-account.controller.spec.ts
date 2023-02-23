/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpsertAccountController } from './iam-upsert-account.controller';
import { IamUpsertAccountHandler } from '../handlers/iam-upsert-account.handler';

// sources
import { accounts } from '@app/iam/account/infrastructure/mock/mock-account.data';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await controller.main(accounts[0])).toBe(accounts[0]);
        });
    });
});