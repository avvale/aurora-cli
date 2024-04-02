import { IamCountRoleQuery } from '@app/iam/role';
import { IamCountRoleService } from '@app/iam/role/application/count/iam-count-role.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamCountRoleQuery)
export class IamCountRoleQueryHandler implements IQueryHandler<IamCountRoleQuery>
{
    constructor(
        private readonly countRoleService: IamCountRoleService,
    ) {}

    async execute(query: IamCountRoleQuery): Promise<number>
    {
        return await this.countRoleService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
