/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateMeAccountHandler } from '../handlers/iam-update-me-account.handler';
import { IamUpdateMeAccountController } from './iam-update-me-account.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateMeAccountController', () =>
{
    let controller: IamUpdateMeAccountController;
    let handler: IamUpdateMeAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateMeAccountController,
            ],
            providers: [
                {
                    provide : IamUpdateMeAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdateMeAccountController>(IamUpdateMeAccountController);
        handler = module.get<IamUpdateMeAccountHandler>(IamUpdateMeAccountHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateMeAccountController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});