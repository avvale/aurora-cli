/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamFindTenantByIdHandler,
    IamFindTenantByIdResolver,
} from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantByIdResolver', () => {
    let resolver: IamFindTenantByIdResolver;
    let handler: IamFindTenantByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindTenantByIdResolver,
                {
                    provide: IamFindTenantByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindTenantByIdResolver>(
            IamFindTenantByIdResolver,
        );
        handler = module.get<IamFindTenantByIdHandler>(
            IamFindTenantByIdHandler,
        );
    });

    test('IamFindTenantByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamFindTenantByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an tenant by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTenantData[0])),
            );
            expect(await resolver.main(iamMockTenantData[0].id)).toBe(
                iamMockTenantData[0],
            );
        });
    });
});
