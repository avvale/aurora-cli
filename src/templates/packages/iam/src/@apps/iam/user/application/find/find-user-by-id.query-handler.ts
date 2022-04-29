import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserResponse } from '../../domain/user.response';
import { UserMapper } from '../../domain/user.mapper';
import { UserId } from '../../domain/value-objects';
import { FindUserByIdQuery } from './find-user-by-id.query';
import { FindUserByIdService } from './find-user-by-id.service';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdQueryHandler implements IQueryHandler<FindUserByIdQuery>
{
    private readonly mapper: UserMapper = new UserMapper();

    constructor(
        private readonly findUserByIdService: FindUserByIdService,
    ) {}

    async execute(query: FindUserByIdQuery): Promise<UserResponse>
    {
        const user = await this.findUserByIdService.main(
            new UserId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(user);
    }
}