/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateRolesAccountsInput } from '@api/graphql';
import { IamUpdateRolesAccountsHandler } from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRolesAccountsHandler', () => {
    let handler: IamUpdateRolesAccountsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamUpdateRolesAccountsHandler,
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

        handler = module.get<IamUpdateRolesAccountsHandler>(
            IamUpdateRolesAccountsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamUpdateRolesAccountsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamUpdateRolesAccountsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a rolesAccounts updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockRoleAccountData[0]),
                    ),
            );
            expect(
                await handler.main(
                    <IamUpdateRolesAccountsInput>iamMockRoleAccountData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(iamMockRoleAccountData[0]);
        });
    });
});
