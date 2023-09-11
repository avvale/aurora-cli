/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteRoleAccountByIdHandler, IamDeleteRoleAccountByIdResolver } from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRoleAccountByIdResolver', () =>
{
    let resolver: IamDeleteRoleAccountByIdResolver;
    let handler: IamDeleteRoleAccountByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteRoleAccountByIdResolver,
                {
                    provide : IamDeleteRoleAccountByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamDeleteRoleAccountByIdResolver>(IamDeleteRoleAccountByIdResolver);
        handler = module.get<IamDeleteRoleAccountByIdHandler>(IamDeleteRoleAccountByIdHandler);
    });

    test('IamDeleteRoleAccountByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteRoleAccountByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an roleAccount deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleAccountData[0])));
            expect(await resolver.main(iamMockRoleAccountData[0].id)).toBe(iamMockRoleAccountData[0]);
        });
    });
});
