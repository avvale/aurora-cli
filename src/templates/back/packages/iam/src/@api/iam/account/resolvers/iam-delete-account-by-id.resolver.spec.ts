/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteAccountByIdHandler, IamDeleteAccountByIdResolver } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteAccountByIdResolver', () =>
{
    let resolver: IamDeleteAccountByIdResolver;
    let handler: IamDeleteAccountByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteAccountByIdResolver,
                {
                    provide : IamDeleteAccountByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamDeleteAccountByIdResolver>(IamDeleteAccountByIdResolver);
        handler = module.get<IamDeleteAccountByIdHandler>(IamDeleteAccountByIdHandler);
    });

    test('IamDeleteAccountByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteAccountByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an account deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockAccountData[0])));
            expect(await resolver.main(iamMockAccountData[0].id)).toBe(iamMockAccountData[0]);
        });
    });
});
