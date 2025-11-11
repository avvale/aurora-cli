/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamFindPermissionByIdHandler,
    IamFindPermissionByIdResolver,
} from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionByIdResolver', () => {
    let resolver: IamFindPermissionByIdResolver;
    let handler: IamFindPermissionByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindPermissionByIdResolver,
                {
                    provide: IamFindPermissionByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindPermissionByIdResolver>(
            IamFindPermissionByIdResolver,
        );
        handler = module.get<IamFindPermissionByIdHandler>(
            IamFindPermissionByIdHandler,
        );
    });

    test('IamFindPermissionByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamFindPermissionByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an permission by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(iamMockPermissionData[0])),
            );
            expect(await resolver.main(iamMockPermissionData[0].id)).toBe(
                iamMockPermissionData[0],
            );
        });
    });
});
