/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamGetRolesAccountsHandler,
    IamGetRolesAccountsResolver,
} from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetRolesAccountsResolver', () => {
    let resolver: IamGetRolesAccountsResolver;
    let handler: IamGetRolesAccountsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamGetRolesAccountsResolver,
                {
                    provide: IamGetRolesAccountsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamGetRolesAccountsResolver>(
            IamGetRolesAccountsResolver,
        );
        handler = module.get<IamGetRolesAccountsHandler>(
            IamGetRolesAccountsHandler,
        );
    });

    test('IamGetRolesAccountsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamGetRolesAccountsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a iamMockRoleAccountData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockRoleAccountData)),
            );
            expect(await resolver.main()).toBe(iamMockRoleAccountData);
        });
    });
});
