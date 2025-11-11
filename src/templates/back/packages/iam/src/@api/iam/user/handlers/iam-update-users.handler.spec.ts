/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateUsersInput } from '@api/graphql';
import { IamUpdateUsersHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateUsersHandler', () => {
    let handler: IamUpdateUsersHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamUpdateUsersHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<IamUpdateUsersHandler>(IamUpdateUsersHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamUpdateUsersHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamUpdateUsersHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a users updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockUserData[0])),
            );
            expect(
                await handler.main(
                    <IamUpdateUsersInput>iamMockUserData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(iamMockUserData[0]);
        });
    });
});
