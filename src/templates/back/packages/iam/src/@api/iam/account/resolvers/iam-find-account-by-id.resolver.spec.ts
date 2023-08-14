/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindAccountByIdHandler, IamFindAccountByIdResolver } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindAccountByIdResolver', () =>
{
    let resolver: IamFindAccountByIdResolver;
    let handler: IamFindAccountByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindAccountByIdResolver,
                {
                    provide : IamFindAccountByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamFindAccountByIdResolver>(IamFindAccountByIdResolver);
        handler = module.get<IamFindAccountByIdHandler>(IamFindAccountByIdHandler);
    });

    test('IamFindAccountByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindAccountByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an account by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockAccountData[0])));
            expect(await resolver.main(iamMockAccountData[0].id)).toBe(iamMockAccountData[0]);
        });
    });
});
