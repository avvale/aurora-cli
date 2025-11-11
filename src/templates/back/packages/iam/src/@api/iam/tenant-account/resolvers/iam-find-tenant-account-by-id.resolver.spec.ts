/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamFindTenantAccountByIdHandler,
    IamFindTenantAccountByIdResolver,
} from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantAccountByIdResolver', () => {
    let resolver: IamFindTenantAccountByIdResolver;
    let handler: IamFindTenantAccountByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindTenantAccountByIdResolver,
                {
                    provide: IamFindTenantAccountByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindTenantAccountByIdResolver>(
            IamFindTenantAccountByIdResolver,
        );
        handler = module.get<IamFindTenantAccountByIdHandler>(
            IamFindTenantAccountByIdHandler,
        );
    });

    test('IamFindTenantAccountByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamFindTenantAccountByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an tenantAccount by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockTenantAccountData[0]),
                    ),
            );
            expect(await resolver.main(iamMockTenantAccountData[0].id)).toBe(
                iamMockTenantAccountData[0],
            );
        });
    });
});
