/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreateRoleAccountInput } from '@api/graphql';
import {
    IamCreateRoleAccountHandler,
    IamCreateRoleAccountResolver,
} from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRoleAccountResolver', () => {
    let resolver: IamCreateRoleAccountResolver;
    let handler: IamCreateRoleAccountHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamCreateRoleAccountResolver,
                {
                    provide: IamCreateRoleAccountHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreateRoleAccountResolver>(
            IamCreateRoleAccountResolver,
        );
        handler = module.get<IamCreateRoleAccountHandler>(
            IamCreateRoleAccountHandler,
        );
    });

    test('IamCreateRoleAccountResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamCreateRoleAccountResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an roleAccount created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockRoleAccountData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <IamCreateRoleAccountInput>iamMockRoleAccountData[0],
                ),
            ).toBe(iamMockRoleAccountData[0]);
        });
    });
});
