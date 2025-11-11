/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamDeletePermissionByIdHandler,
    IamDeletePermissionByIdResolver,
} from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionByIdResolver', () => {
    let resolver: IamDeletePermissionByIdResolver;
    let handler: IamDeletePermissionByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamDeletePermissionByIdResolver,
                {
                    provide: IamDeletePermissionByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamDeletePermissionByIdResolver>(
            IamDeletePermissionByIdResolver,
        );
        handler = module.get<IamDeletePermissionByIdHandler>(
            IamDeletePermissionByIdHandler,
        );
    });

    test('IamDeletePermissionByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamDeletePermissionByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an permission deleted', async () => {
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
