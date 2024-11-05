import { Pipe, PipeTransform } from '@angular/core';
import { ChatMessage } from '@apps/chat';
import { IamService } from '@aurora';

@Pipe({
    name      : 'isMine',
    pure      : true,
    standalone: true,
})
export class IsMinePipe implements PipeTransform
{
    constructor(
        private readonly iamService: IamService,
    ) {}

    transform(message: ChatMessage): boolean
    {
        return message.accountId === this.iamService.me.id;
    }
}
