import { IamMinRoleQuery } from '@app/iam/role';
import { IamMinRoleService } from '@app/iam/role/application/min/iam-min-role.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMinRoleQuery)
export class IamMinRoleQueryHandler implements IQueryHandler<IamMinRoleQuery>
{
    constructor(
        private readonly minRoleService: IamMinRoleService,
    ) {}

    async execute(query: IamMinRoleQuery): Promise<number>
    {
        return await this.minRoleService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
