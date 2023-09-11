import { IamFindRoleByIdQuery, IamRoleMapper, IamRoleResponse } from '@app/iam/role';
import { IamFindRoleByIdService } from '@app/iam/role/application/find/iam-find-role-by-id.service';
import { IamRoleId } from '@app/iam/role/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
