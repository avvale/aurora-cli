/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateBoundedContextByIdResolver } from './iam-update-bounded-context-by-id.resolver';
import { IamUpdateBoundedContextByIdHandler } from '../handlers/iam-update-bounded-context-by-id.handler';
import { IamUpdateBoundedContextByIdInput } from '../../../../graphql';

// sources
import { boundedContexts } from '@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamUpdateBoundedContextByIdResolver', () =>
{
    let resolver: IamUpdateBoundedContextByIdResolver;
    let handler: IamUpdateBoundedContextByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateBoundedContextByIdResolver,
                {
                    provide : IamUpdateBoundedContextByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdateBoundedContextByIdResolver>(IamUpdateBoundedContextByIdResolver);
        handler = module.get<IamUpdateBoundedContextByIdHandler>(IamUpdateBoundedContextByIdHandler);
    });

    test('IamUpdateBoundedContextByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateBoundedContextByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a boundedContext by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await resolver.main(<IamUpdateBoundedContextByIdInput>boundedContexts[0])).toBe(boundedContexts[0]);
        });
    });
});