import { Pipe, PipeTransform } from '@angular/core';
import { ChatMessage, IamService } from '@aurora';

@Pipe({
    name      : 'isNotMine',
    pure      : true,
    standalone: true,
})
export class IsNotMinePipe implements PipeTransform
{
    constructor(
        private readonly iamService: IamService,
    ) {}

    transform(message: ChatMessage): boolean
    {
        return message.accountId !== this.iamService.me.id;
    }
}
