/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamDeletePermissionsHandler,
    IamDeletePermissionsResolver,
} from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionsResolver', () => {
    let resolver: IamDeletePermissionsResolver;
    let handler: IamDeletePermissionsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamDeletePermissionsResolver,
                {
                    provide: IamDeletePermissionsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamDeletePermissionsResolver>(
            IamDeletePermissionsResolver,
        );
        handler = module.get<IamDeletePermissionsHandler>(
            IamDeletePermissionsHandler,
        );
    });

    test('IamDeletePermissionsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamDeletePermissionsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an iamMockPermissionData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockPermissionData)),
            );
            expect(await resolver.main()).toBe(iamMockPermissionData);
        });
    });
});
