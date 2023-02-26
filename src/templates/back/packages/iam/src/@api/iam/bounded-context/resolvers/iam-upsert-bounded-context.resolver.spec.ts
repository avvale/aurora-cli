/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpsertBoundedContextResolver } from './iam-upsert-bounded-context.resolver';
import { IamUpsertBoundedContextHandler } from '../handlers/iam-upsert-bounded-context.handler';
import { IamUpdateBoundedContextByIdInput } from '@api/graphql';

// sources
import { boundedContexts } from '@app/iam/bounded-context/infrastructure/mock/mock-bounded-context.data';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await resolver.main(<IamUpdateBoundedContextByIdInput>boundedContexts[0])).toBe(boundedContexts[0]);
        });
    });
});