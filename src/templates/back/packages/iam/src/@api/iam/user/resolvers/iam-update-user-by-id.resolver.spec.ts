/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateUserByIdInput } from '@api/graphql';
import { IamUpdateUserByIdHandler, IamUpdateUserByIdResolver } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateUserByIdResolver', () =>
{
    let resolver: IamUpdateUserByIdResolver;
    let handler: IamUpdateUserByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateUserByIdResolver,
                {
                    provide : IamUpdateUserByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdateUserByIdResolver>(IamUpdateUserByIdResolver);
        handler = module.get<IamUpdateUserByIdHandler>(IamUpdateUserByIdHandler);
    });

    test('IamUpdateUserByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateUserByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a user by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockUserData[0])));
            expect(await resolver.main(<IamUpdateUserByIdInput>iamMockUserData[0])).toBe(iamMockUserData[0]);
        });
    });
});
