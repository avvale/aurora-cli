import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamRoleResponse } from '../../domain/iam-role.response';
import { IamRoleMapper } from '../../domain/iam-role.mapper';
import { IamRoleId } from '../../domain/value-objects';
import { IamFindRoleByIdQuery } from './iam-find-role-by-id.query';
import { IamFindRoleByIdService } from './iam-find-role-by-id.service';

@QueryHandler(IamFindRoleByIdQuery)
export class IamFindRoleByIdQueryHandler implements IQueryHandler<IamFindRoleByIdQuery>
{
    private readonly mapper: IamRoleMapper = new IamRoleMapper();

    constructor(
        private readonly findRoleByIdService: IamFindRoleByIdService,
    ) {}

    async execute(query: IamFindRoleByIdQuery): Promise<IamRoleResponse>
    {
        const role = await this.findRoleByIdService.main(
            new IamRoleId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(role);
    }
}
