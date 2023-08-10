/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateBoundedContextByIdInput } from '@api/graphql';
import { IamUpsertBoundedContextHandler, IamUpsertBoundedContextResolver } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertBoundedContextResolver', () =>
{
    let resolver: IamUpsertBoundedContextResolver;
    let handler: IamUpsertBoundedContextHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertBoundedContextResolver,
                {
                    provide : IamUpsertBoundedContextHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpsertBoundedContextResolver>(IamUpsertBoundedContextResolver);
        handler = module.get<IamUpsertBoundedContextHandler>(IamUpsertBoundedContextHandler);
    });

    test('IamUpsertBoundedContextResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpsertBoundedContextResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an boundedContext upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockBoundedContextData[0])));
            expect(await resolver.main(<IamUpdateBoundedContextByIdInput>iamMockBoundedContextData[0])).toBe(iamMockBoundedContextData[0]);
        });
    });
});
