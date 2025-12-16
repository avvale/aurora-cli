import { Injectable } from '@nestjs/common';

@Injectable()
export class IamPermissionRoleSagas {
    /* @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> =>
    {
        return events$
            .pipe(
                ofType(CreatedPermissionRoleEvent),
                delay(1000),
                map(event => {
                    return 'command';
                }),
            );
    } */
}
