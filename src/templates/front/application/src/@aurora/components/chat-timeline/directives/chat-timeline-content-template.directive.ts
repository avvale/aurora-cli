import { Directive, Input, TemplateRef } from '@angular/core';

export type ChatTimelineCustomContentPosition = 'before' | 'after';

@Directive({
    selector: '[auChatTimelineContentTemplate]',
})
export class ChatTimelineContentTemplateDirective
{
    @Input() position: ChatTimelineCustomContentPosition;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}