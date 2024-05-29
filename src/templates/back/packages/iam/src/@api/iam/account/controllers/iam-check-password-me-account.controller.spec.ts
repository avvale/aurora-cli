/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCheckPasswordMeAccountHandler } from '../handlers/iam-check-password-me-account.handler';
import { IamCheckPasswordMeAccountController } from './iam-check-password-me-account.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCheckPasswordMeAccountController', () =>
{
    let controller: IamCheckPasswordMeAccountController;
    let handler: IamCheckPasswordMeAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamCheckPasswordMeAccountController,
            ],
            providers: [
                {
                    provide : IamCheckPasswordMeAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamCheckPasswordMeAccountController>(IamCheckPasswordMeAccountController);
        handler = module.get<IamCheckPasswordMeAccountHandler>(IamCheckPasswordMeAccountHandler);
    });

    describe('main', () =>
    {
        test('IamCheckPasswordMeAccountController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});