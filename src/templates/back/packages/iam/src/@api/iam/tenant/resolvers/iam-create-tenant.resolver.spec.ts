/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreateTenantInput } from '@api/graphql';
import {
    IamCreateTenantHandler,
    IamCreateTenantResolver,
} from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTenantResolver', () => {
    let resolver: IamCreateTenantResolver;
    let handler: IamCreateTenantHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamCreateTenantResolver,
                {
                    provide: IamCreateTenantHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreateTenantResolver>(IamCreateTenantResolver);
        handler = module.get<IamCreateTenantHandler>(IamCreateTenantHandler);
    });

    test('IamCreateTenantResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamCreateTenantResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an tenant created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTenantData[0])),
            );
            expect(
                await resolver.main(<IamCreateTenantInput>iamMockTenantData[0]),
            ).toBe(iamMockTenantData[0]);
        });
    });
});
