/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamMeAccountUpdateHandler } from '../handlers/iam-me-account-update.handler';
import { IamMeAccountUpdateController } from './iam-me-account-update.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMeAccountUpdateController', () =>
{
    let controller: IamMeAccountUpdateController;
    let handler: IamMeAccountUpdateHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamMeAccountUpdateController,
            ],
            providers: [
                {
                    provide : IamMeAccountUpdateHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamMeAccountUpdateController>(IamMeAccountUpdateController);
        handler = module.get<IamMeAccountUpdateHandler>(IamMeAccountUpdateHandler);
    });

    describe('main', () =>
    {
        test('IamMeAccountUpdateController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});