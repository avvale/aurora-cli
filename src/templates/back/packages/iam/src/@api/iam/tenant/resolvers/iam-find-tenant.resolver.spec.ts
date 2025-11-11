/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindTenantHandler, IamFindTenantResolver } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantResolver', () => {
    let resolver: IamFindTenantResolver;
    let handler: IamFindTenantHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindTenantResolver,
                {
                    provide: IamFindTenantHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindTenantResolver>(IamFindTenantResolver);
        handler = module.get<IamFindTenantHandler>(IamFindTenantHandler);
    });

    test('IamFindTenantResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamFindTenantResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a tenant', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTenantData[0])),
            );
            expect(await resolver.main()).toBe(iamMockTenantData[0]);
        });
    });
});
