/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteBoundedContextsResolver } from './iam-delete-bounded-contexts.resolver';
import { IamDeleteBoundedContextsHandler } from '../handlers/iam-delete-bounded-contexts.handler';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamDeleteBoundedContextsResolver', () =>
{
    let resolver: IamDeleteBoundedContextsResolver;
    let handler: IamDeleteBoundedContextsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteBoundedContextsResolver,
                {
                    provide : IamDeleteBoundedContextsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamDeleteBoundedContextsResolver>(IamDeleteBoundedContextsResolver);
        handler = module.get<IamDeleteBoundedContextsHandler>(IamDeleteBoundedContextsHandler);
    });

    test('IamDeleteBoundedContextsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteBoundedContextsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an boundedContexts deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts)));
            expect(await resolver.main()).toBe(boundedContexts);
        });
    });
});