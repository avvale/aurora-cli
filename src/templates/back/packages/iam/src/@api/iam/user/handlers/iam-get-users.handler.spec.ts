/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamGetUsersHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetUsersHandler', () => {
    let handler: IamGetUsersHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamGetUsersHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<IamGetUsersHandler>(IamGetUsersHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamGetUsersHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamGetUsersHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a iamMockUserData', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockUserData)),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                iamMockUserData,
            );
        });
    });
});
