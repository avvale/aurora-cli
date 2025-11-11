/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindUserByIdHandler, IamFindUserByIdResolver } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindUserByIdResolver', () => {
    let resolver: IamFindUserByIdResolver;
    let handler: IamFindUserByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindUserByIdResolver,
                {
                    provide: IamFindUserByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindUserByIdResolver>(IamFindUserByIdResolver);
        handler = module.get<IamFindUserByIdHandler>(IamFindUserByIdHandler);
    });

    test('IamFindUserByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamFindUserByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an user by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockUserData[0])),
            );
            expect(await resolver.main(iamMockUserData[0].id)).toBe(
                iamMockUserData[0],
            );
        });
    });
});
