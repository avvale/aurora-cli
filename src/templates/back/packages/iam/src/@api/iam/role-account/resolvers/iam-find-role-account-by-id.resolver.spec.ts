/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamFindRoleAccountByIdHandler,
    IamFindRoleAccountByIdResolver,
} from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleAccountByIdResolver', () => {
    let resolver: IamFindRoleAccountByIdResolver;
    let handler: IamFindRoleAccountByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindRoleAccountByIdResolver,
                {
                    provide: IamFindRoleAccountByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindRoleAccountByIdResolver>(
            IamFindRoleAccountByIdResolver,
        );
        handler = module.get<IamFindRoleAccountByIdHandler>(
            IamFindRoleAccountByIdHandler,
        );
    });

    test('IamFindRoleAccountByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamFindRoleAccountByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an roleAccount by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockRoleAccountData[0]),
                    ),
            );
            expect(await resolver.main(iamMockRoleAccountData[0].id)).toBe(
                iamMockRoleAccountData[0],
            );
        });
    });
});
