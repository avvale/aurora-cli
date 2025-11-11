/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindUserHandler, IamFindUserResolver } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindUserResolver', () => {
    let resolver: IamFindUserResolver;
    let handler: IamFindUserHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindUserResolver,
                {
                    provide: IamFindUserHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindUserResolver>(IamFindUserResolver);
        handler = module.get<IamFindUserHandler>(IamFindUserHandler);
    });

    test('IamFindUserResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamFindUserResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a user', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockUserData[0])),
            );
            expect(await resolver.main()).toBe(iamMockUserData[0]);
        });
    });
});
