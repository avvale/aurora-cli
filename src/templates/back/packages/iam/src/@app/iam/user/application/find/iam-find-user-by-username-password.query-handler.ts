import { IamAccountUsername } from '@app/iam/account/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamUserMapper } from '../../domain/iam-user.mapper';
import { IamUserResponse } from '../../domain/iam-user.response';
import { IamUserPassword } from '../../domain/value-objects';
import { IamFindUserByUsernamePasswordQuery } from './iam-find-user-by-username-password.query';
import { IamFindUserByUsernamePasswordService } from './iam-find-user-by-username-password.service';

@QueryHandler(IamFindUserByUsernamePasswordQuery)
export class IamFindUserByUsernamePasswordQueryHandler
    implements IQueryHandler<IamFindUserByUsernamePasswordQuery>
{
    private readonly mapper: IamUserMapper = new IamUserMapper();

    constructor(
        private readonly findUserByUsernamePasswordService: IamFindUserByUsernamePasswordService,
    ) {}

    async execute(
        query: IamFindUserByUsernamePasswordQuery,
    ): Promise<IamUserResponse> {
        const user = await this.findUserByUsernamePasswordService.main(
            new IamAccountUsername(query.username),
            new IamUserPassword(query.password),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(user);
    }
}
