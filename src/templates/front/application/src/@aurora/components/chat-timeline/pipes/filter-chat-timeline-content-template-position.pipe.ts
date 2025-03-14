import { Pipe, PipeTransform, QueryList } from '@angular/core';
import { ChatTimelineContentTemplateDirective, ChatTimelineCustomContentPosition } from '../directives/chat-timeline-content-template.directive';

@Pipe({
    name      : 'filterChatTimelineContentTemplatePosition',
    standalone: true,
})
export class FilterChatTimelineContentTemplatePositionPipe implements PipeTransform
{
    transform(chatTimelineContentTemplates: QueryList<ChatTimelineContentTemplateDirective>, position: ChatTimelineCustomContentPosition): ChatTimelineContentTemplateDirective[]
    {
        return chatTimelineContentTemplates
            .filter(
                (chatTimelineContentTemplate: ChatTimelineContentTemplateDirective) => chatTimelineContentTemplate.position === position,
            );
    }
}
