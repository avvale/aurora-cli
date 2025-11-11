/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { IamCheckUniqueUsernameAccountHandler } from '../handlers/iam-check-unique-username-account.handler';
import { IamCheckUniqueUsernameAccountController } from './iam-check-unique-username-account.controller';

describe('IamCheckUniqueUsernameAccountController', () => {
    let controller: IamCheckUniqueUsernameAccountController;
    let handler: IamCheckUniqueUsernameAccountHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamCheckUniqueUsernameAccountController],
            providers: [
                {
                    provide: IamCheckUniqueUsernameAccountHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamCheckUniqueUsernameAccountController>(
            IamCheckUniqueUsernameAccountController,
        );
        handler = module.get<IamCheckUniqueUsernameAccountHandler>(
            IamCheckUniqueUsernameAccountHandler,
        );
    });

    describe('main', () => {
        test('IamCheckUniqueUsernameAccountController should be defined', () => {
            expect(controller).toBeDefined();
        });
    });
});
