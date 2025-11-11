/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamFindPermissionHandler,
    IamFindPermissionResolver,
} from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionResolver', () => {
    let resolver: IamFindPermissionResolver;
    let handler: IamFindPermissionHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindPermissionResolver,
                {
                    provide: IamFindPermissionHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindPermissionResolver>(
            IamFindPermissionResolver,
        );
        handler = module.get<IamFindPermissionHandler>(
            IamFindPermissionHandler,
        );
    });

    test('IamFindPermissionResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamFindPermissionResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a permission', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(iamMockPermissionData[0])),
            );
            expect(await resolver.main()).toBe(iamMockPermissionData[0]);
        });
    });
});
