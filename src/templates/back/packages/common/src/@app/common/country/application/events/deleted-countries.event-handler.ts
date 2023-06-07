import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedCountriesEvent } from './deleted-countries.event';

@EventsHandler(DeletedCountriesEvent)
export class DeletedCountriesEventHandler implements IEventHandler<DeletedCountriesEvent>
{
    handle(event: DeletedCountriesEvent): void
    {
        // console.log('DeletedCountriesEvent: ', event);
    }
}