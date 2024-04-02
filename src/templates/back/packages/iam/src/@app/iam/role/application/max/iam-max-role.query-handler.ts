import { IamMaxRoleQuery } from '@app/iam/role';
import { IamMaxRoleService } from '@app/iam/role/application/max/iam-max-role.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMaxRoleQuery)
export class IamMaxRoleQueryHandler implements IQueryHandler<IamMaxRoleQuery>
{
    constructor(
        private readonly maxRoleService: IamMaxRoleService,
    ) {}

    async execute(query: IamMaxRoleQuery): Promise<number>
    {
        return await this.maxRoleService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
