import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamUserResponse } from '../../domain/iam-user.response';
import { IamUserMapper } from '../../domain/iam-user.mapper';
import { IamUserId } from '../../domain/value-objects';
import { IamFindUserByIdQuery } from './iam-find-user-by-id.query';
import { IamFindUserByIdService } from './iam-find-user-by-id.service';

@QueryHandler(IamFindUserByIdQuery)
export class IamFindUserByIdQueryHandler implements IQueryHandler<IamFindUserByIdQuery>
{
    private readonly mapper: IamUserMapper = new IamUserMapper();

    constructor(
        private readonly findUserByIdService: IamFindUserByIdService,
    ) {}

    async execute(query: IamFindUserByIdQuery): Promise<IamUserResponse>
    {
        const user = await this.findUserByIdService.main(
            new IamUserId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(user);
    }
}
