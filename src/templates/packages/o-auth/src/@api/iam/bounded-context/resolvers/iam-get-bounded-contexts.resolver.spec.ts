/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetBoundedContextsResolver } from './iam-get-bounded-contexts.resolver';
import { IamGetBoundedContextsHandler } from '../handlers/iam-get-bounded-contexts.handler';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamGetBoundedContextsResolver', () =>
{
    let resolver: IamGetBoundedContextsResolver;
    let handler: IamGetBoundedContextsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamGetBoundedContextsResolver,
                {
                    provide : IamGetBoundedContextsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamGetBoundedContextsResolver>(IamGetBoundedContextsResolver);
        handler = module.get<IamGetBoundedContextsHandler>(IamGetBoundedContextsHandler);
    });

    test('IamGetBoundedContextsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('IamGetBoundedContextsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a boundedContexts', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts)));
            expect(await resolver.main()).toBe(boundedContexts);
        });
    });
});