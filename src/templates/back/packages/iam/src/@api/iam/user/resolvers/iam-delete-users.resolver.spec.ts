/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteUsersHandler, IamDeleteUsersResolver } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteUsersResolver', () =>
{
    let resolver: IamDeleteUsersResolver;
    let handler: IamDeleteUsersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteUsersResolver,
                {
                    provide : IamDeleteUsersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamDeleteUsersResolver>(IamDeleteUsersResolver);
        handler = module.get<IamDeleteUsersHandler>(IamDeleteUsersHandler);
    });

    test('IamDeleteUsersResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteUsersResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an iamMockUserData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockUserData)));
            expect(await resolver.main()).toBe(iamMockUserData);
        });
    });
});
