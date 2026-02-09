# Unit Testing Patterns

## Handler Unit Test

```typescript
describe('CreateUserHandler', () => {
    let handler: CreateUserHandler;
    let service: CreateUserService;
    let repository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUserHandler,
                {
                    provide: CreateUserService,
                    useValue: { main: jest.fn() },
                },
                {
                    provide: UserRepository,
                    useValue: { find: jest.fn() },
                },
            ],
        }).compile();

        handler = module.get<CreateUserHandler>(CreateUserHandler);
        service = module.get<CreateUserService>(CreateUserService);
        repository = module.get<UserRepository>(UserRepository);
    });

    it('should throw ConflictException if user exists', async () => {
        jest.spyOn(repository, 'find').mockResolvedValue({ id: '1' });

        await expect(
            handler.execute({ payload: { email: 'test@example.com' } }),
        ).rejects.toThrow(ConflictException);
    });
});
```

For comprehensive testing patterns, see `jest-nestjs` and `supertest-nestjs` skills.
