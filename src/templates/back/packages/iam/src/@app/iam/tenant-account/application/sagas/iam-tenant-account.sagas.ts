import { Injectable } from '@nestjs/common';

@Injectable()
export class IamTenantAccountSagas {
  /* @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> =>
    {
        return events$
            .pipe(
                ofType(CreatedTenantAccountEvent),
                delay(1000),
                map(event => {
                    return 'command';
                }),
            );
    } */
}
