import { Injectable } from '@nestjs/common';

@Injectable()
export class IamRoleAccountSagas {
  /* @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> =>
    {
        return events$
            .pipe(
                ofType(CreatedRoleAccountEvent),
                delay(1000),
                map(event => {
                    return 'command';
                }),
            );
    } */
}
