/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamGetPermissionsHandler,
    IamGetPermissionsResolver,
} from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetPermissionsResolver', () => {
    let resolver: IamGetPermissionsResolver;
    let handler: IamGetPermissionsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamGetPermissionsResolver,
                {
                    provide: IamGetPermissionsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamGetPermissionsResolver>(
            IamGetPermissionsResolver,
        );
        handler = module.get<IamGetPermissionsHandler>(
            IamGetPermissionsHandler,
        );
    });

    test('IamGetPermissionsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamGetPermissionsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a iamMockPermissionData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockPermissionData)),
            );
            expect(await resolver.main()).toBe(iamMockPermissionData);
        });
    });
});
