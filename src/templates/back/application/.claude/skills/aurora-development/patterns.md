# Common Patterns Reference

## Pattern 1: Command with Pre-Validation

```typescript
@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler {
    constructor(
        private readonly service: CreateOrderService,
        private readonly productRepository: ProductRepository,
    ) {}

    async execute(command: CreateOrderCommand): Promise<void> {
        /* #region AI-generated code */
        // Validate product exists and has stock
        const product = await this.productRepository.findById(
            command.payload.productId,
        );

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (product.stock < command.payload.quantity) {
            throw new BadRequestException('Insufficient stock');
        }
        /* #endregion AI-generated code */

        await this.service.main(command.payload, command.cQMetadata);
    }
}
```

## Pattern 2: Query with Caching

```typescript
@QueryHandler(GetProductsQuery)
export class GetProductsQueryHandler {
    constructor(
        private readonly service: GetProductsService,
        private readonly cache: CacheService,
    ) {}

    async execute(query: GetProductsQuery): Promise<ProductResponse[]> {
        /* #region AI-generated code */
        const key = `products:${JSON.stringify(query.queryStatement)}`;
        const cached = await this.cache.get(key);
        if (cached) return cached;
        /* #endregion AI-generated code */

        const products = await this.service.main(...);
        const responses = this.mapper.mapAggregatesToResponses(products);

        /* #region AI-generated code */
        await this.cache.set(key, responses, 3600);
        /* #endregion AI-generated code */

        return responses;
    }
}
```

## Pattern 3: Global Exception Filter

```typescript
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    /* #region AI-generated code */
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException
                ? exception.message
                : 'Internal server error';

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message,
        });
    }
    /* #endregion AI-generated code */
}
```

## Pattern 4: Custom Domain Operation (provision, cancel, approve, etc.)

When you need a domain operation that doesn't map to a simple CRUD action:

**1. Create a dedicated Command** in `@app/.../application/<operation>/`
**2. Create a CommandHandler** that validates + delegates to service
**3. Create a Service** that only does persistence + events
**4. Register all in `index.ts`** (export command, add handler + service to arrays)
**5. Simplify @api handler** to only `commandBus.dispatch(new CustomCommand(...))`

```typescript
// ✅ CORRECT: @api handler is thin
@Injectable()
export class ProvisionOrderHandler {
    constructor(private readonly commandBus: ICommandBus) {}

    async main(id: string): Promise<boolean> {
        await this.commandBus.dispatch(new ProvisionOrderByIdCommand({ id }));
        return true;
    }
}

// ✅ CORRECT: Business validation in @app CommandHandler
@CommandHandler(ProvisionOrderByIdCommand)
export class ProvisionOrderByIdCommandHandler {
    constructor(
        private readonly repository: IOrderRepository,
        private readonly service: ProvisionOrderByIdService,
    ) {}

    async execute(command: ProvisionOrderByIdCommand): Promise<void> {
        /* #region AI-generated code */
        const order = await this.repository.findById(
            new OrderId(command.payload.id),
        );

        if (order.status.value !== 'PENDING') {
            throw new BadRequestException(
                'Only PENDING orders can be provisioned',
            );
        }
        /* #endregion AI-generated code */

        await this.service.main(
            new OrderId(command.payload.id),
            command.cQMetadata,
        );
    }
}
```

**Decision: When to create a custom command?**

```
Is the operation just a CRUD? (create, update, delete, find)
├─ YES → Use the existing generated command
└─ NO → It's a DOMAIN OPERATION (provision, cancel, approve, reject, etc.)
   └─ Create a NEW Command + Handler + Service in @app/
```
