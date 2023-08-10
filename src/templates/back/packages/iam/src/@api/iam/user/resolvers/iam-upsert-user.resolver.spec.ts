/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateUserByIdInput } from '@api/graphql';
import { IamUpsertUserHandler, IamUpsertUserResolver } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertUserResolver', () =>
{
    let resolver: IamUpsertUserResolver;
    let handler: IamUpsertUserHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertUserResolver,
                {
                    provide : IamUpsertUserHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpsertUserResolver>(IamUpsertUserResolver);
        handler = module.get<IamUpsertUserHandler>(IamUpsertUserHandler);
    });

    test('IamUpsertUserResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpsertUserResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an user upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockUserData[0])));
            expect(await resolver.main(<IamUpdateUserByIdInput>iamMockUserData[0])).toBe(iamMockUserData[0]);
        });
    });
});
