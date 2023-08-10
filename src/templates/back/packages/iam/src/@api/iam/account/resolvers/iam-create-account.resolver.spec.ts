/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreateAccountInput } from '@api/graphql';
import { IamCreateAccountHandler, IamCreateAccountResolver } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateAccountResolver', () =>
{
    let resolver: IamCreateAccountResolver;
    let handler: IamCreateAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamCreateAccountResolver,
                {
                    provide : IamCreateAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamCreateAccountResolver>(IamCreateAccountResolver);
        handler = module.get<IamCreateAccountHandler>(IamCreateAccountHandler);
    });

    test('IamCreateAccountResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateAccountResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an account created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockAccountData[0])));
            expect(await resolver.main(<IamCreateAccountInput>iamMockAccountData[0], {
                req: {
                    headers: {
                        // mock jwt
                        // eslint-disable-next-line max-len
                        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImppdCI6IjE1MjQifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.oDME4U1e7-hco5Nyx2pUlO53jcm7x3zakYHWpnHUHzI',
                    },
                },
            })).toBe(iamMockAccountData[0]);
        });
    });
});
