/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamFindRoleAccountHandler,
    IamFindRoleAccountResolver,
} from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleAccountResolver', () => {
    let resolver: IamFindRoleAccountResolver;
    let handler: IamFindRoleAccountHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindRoleAccountResolver,
                {
                    provide: IamFindRoleAccountHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindRoleAccountResolver>(
            IamFindRoleAccountResolver,
        );
        handler = module.get<IamFindRoleAccountHandler>(
            IamFindRoleAccountHandler,
        );
    });

    test('IamFindRoleAccountResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamFindRoleAccountResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a roleAccount', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockRoleAccountData[0]),
                    ),
            );
            expect(await resolver.main()).toBe(iamMockRoleAccountData[0]);
        });
    });
});
