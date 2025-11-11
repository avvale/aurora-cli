import { IamAccountUsername } from '@app/iam/account/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IamUser } from '../../domain/iam-user.aggregate';
import { IamIUserRepository } from '../../domain/iam-user.repository';
import { IamUserPassword } from '../../domain/value-objects';

@Injectable()
export class IamFindUserByUsernamePasswordService {
    constructor(private readonly repository: IamIUserRepository) {}

    public async main(
        username: IamAccountUsername,
        password: IamUserPassword,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamUser> {
        const user = await this.repository.find({
            queryStatement: {
                include: [
                    {
                        association: 'account',
                        where: {
                            username: username.value,
                        },
                    },
                ],
            },
            constraint,
            cQMetadata,
        });

        // check user active, and correct password
        if (
            user &&
            user.account.isActive &&
            bcrypt.compareSync(password.value, user.password.value)
        ) {
            // set validation rule to undefinable
            user.password.validationRules = Object.assign(
                user.password.validationRules,
                {
                    undefinable: true,
                },
            );

            // delete password from response
            user.password.value = undefined;

            return user;
        }

        return null;
    }
}
