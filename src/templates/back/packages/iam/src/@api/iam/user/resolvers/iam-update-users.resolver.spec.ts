/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateUsersInput } from '@api/graphql';
import { IamUpdateUsersHandler, IamUpdateUsersResolver } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateUsersResolver', () =>
{
    let resolver: IamUpdateUsersResolver;
    let handler: IamUpdateUsersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateUsersResolver,
                {
                    provide : IamUpdateUsersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdateUsersResolver>(IamUpdateUsersResolver);
        handler = module.get<IamUpdateUsersHandler>(IamUpdateUsersHandler);
    });

    test('IamUpdateUsersResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateUsersResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a users updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockUserData[0])));
            expect(await resolver.main(<IamUpdateUsersInput>iamMockUserData[0])).toBe(iamMockUserData[0]);
        });
    });
});
