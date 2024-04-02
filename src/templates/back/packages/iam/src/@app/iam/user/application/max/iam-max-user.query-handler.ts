import { IamMaxUserQuery } from '@app/iam/user';
import { IamMaxUserService } from '@app/iam/user/application/max/iam-max-user.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMaxUserQuery)
export class IamMaxUserQueryHandler implements IQueryHandler<IamMaxUserQuery>
{
    constructor(
        private readonly maxUserService: IamMaxUserService,
    ) {}

    async execute(query: IamMaxUserQuery): Promise<number>
    {
        return await this.maxUserService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
