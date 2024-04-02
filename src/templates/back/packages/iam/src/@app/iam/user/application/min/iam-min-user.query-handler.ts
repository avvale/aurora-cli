import { IamMinUserQuery } from '@app/iam/user';
import { IamMinUserService } from '@app/iam/user/application/min/iam-min-user.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMinUserQuery)
export class IamMinUserQueryHandler implements IQueryHandler<IamMinUserQuery>
{
    constructor(
        private readonly minUserService: IamMinUserService,
    ) {}

    async execute(query: IamMinUserQuery): Promise<number>
    {
        return await this.minUserService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
