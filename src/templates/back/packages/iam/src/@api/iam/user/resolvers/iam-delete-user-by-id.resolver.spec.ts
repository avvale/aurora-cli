/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamDeleteUserByIdHandler,
    IamDeleteUserByIdResolver,
} from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteUserByIdResolver', () => {
    let resolver: IamDeleteUserByIdResolver;
    let handler: IamDeleteUserByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamDeleteUserByIdResolver,
                {
                    provide: IamDeleteUserByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamDeleteUserByIdResolver>(
            IamDeleteUserByIdResolver,
        );
        handler = module.get<IamDeleteUserByIdHandler>(
            IamDeleteUserByIdHandler,
        );
    });

    test('IamDeleteUserByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamDeleteUserByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an user deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockUserData[0])),
            );
            expect(await resolver.main(iamMockUserData[0].id)).toBe(
                iamMockUserData[0],
            );
        });
    });
});
