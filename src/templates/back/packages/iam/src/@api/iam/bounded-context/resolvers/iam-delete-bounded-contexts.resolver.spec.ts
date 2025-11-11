/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamDeleteBoundedContextsHandler,
    IamDeleteBoundedContextsResolver,
} from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteBoundedContextsResolver', () => {
    let resolver: IamDeleteBoundedContextsResolver;
    let handler: IamDeleteBoundedContextsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamDeleteBoundedContextsResolver,
                {
                    provide: IamDeleteBoundedContextsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamDeleteBoundedContextsResolver>(
            IamDeleteBoundedContextsResolver,
        );
        handler = module.get<IamDeleteBoundedContextsHandler>(
            IamDeleteBoundedContextsHandler,
        );
    });

    test('IamDeleteBoundedContextsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamDeleteBoundedContextsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an iamMockBoundedContextData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockBoundedContextData),
                    ),
            );
            expect(await resolver.main()).toBe(iamMockBoundedContextData);
        });
    });
});
