import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
    Component,
    ContentChildren,
    effect,
    input,
    InputSignal,
    output,
    OutputEmitterRef,
    QueryList,
    signal,
    untracked,
    ViewChild,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
    Account,
    ChatMessage,
    ChatTimelineContentTemplateDirective,
    MarkdownService,
    SpinnerType,
} from '@aurora';
import { MarkdownToHtmlPipe } from '@aurora/pipes/markdown-to-html.pipe';
import { last } from 'lodash-es';
import { IsMinePipe } from './pipes/is-mine.pipe';
import { IsNotMinePipe } from './pipes/is-not-mine.pipe';
// avoid error ERROR TypeError: Cannot read properties of undefined (reading 'ɵcmp'), with specific import
import { DateFormatPipe } from '@aurora/pipes/date-format.pipe';
import { FilterChatTimelineContentTemplatePositionPipe } from './pipes/filter-chat-timeline-content-template-position.pipe';

@Component({
    selector: 'au-chat-timeline',
    templateUrl: './chat-timeline.component.html',
    styles: `
        .mat-mdc-mini-fab .mat-mdc-button-touch-target {
            height: 100% !important;
            width: 100% !important;
        }
    `,
    encapsulation: ViewEncapsulation.None,
    imports: [
        DateFormatPipe,
        FilterChatTimelineContentTemplatePositionPipe,
        IsMinePipe,
        IsNotMinePipe,
        MarkdownToHtmlPipe,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NgClass,
        NgTemplateOutlet,
        TextFieldModule,
    ],
})
export class ChatTimelineComponent {
    @ViewChild('messageInput') messageInput;
    @ContentChildren(ChatTimelineContentTemplateDirective)
    chatTimelineContentsTemplate?: QueryList<ChatTimelineContentTemplateDirective>;

    // inputs
    spinnerType = SpinnerType;
    chatMessages: InputSignal<ChatMessage[]> = input.required();
    currentAccount: InputSignal<Account> = input.required();
    typeSpinner: InputSignal<SpinnerType> = input(SpinnerType.BUBBLE);
    speedTyped: InputSignal<number> = input(30);
    showSpinner: InputSignal<boolean> = input(false);
    typeLastMessage: InputSignal<boolean> = input(false);
    canDeleteMessage: InputSignal<boolean> = input(false);
    isTyped: WritableSignal<boolean> = signal(false);
    typedMessage: WritableSignal<string> = signal('');

    // outputs
    sendMessage: OutputEmitterRef<string> = output();
    deleteMessage: OutputEmitterRef<ChatMessage> = output();
    scroll: OutputEmitterRef<Event> = output();

    constructor(private markdownService: MarkdownService) {
        effect(() => {
            const messages = this.chatMessages();

            untracked(() => {
                this.isTyped.set(this.typeLastMessage());

                if (this.isTyped()) {
                    this.typewriterMessage(messages);
                }
            });
        });
    }

    typewriterMessage(messages: ChatMessage[]): void {
        const message: string = last(messages).message;
        if (this.typedMessage().length < message.length) {
            this.typedMessage.set(
                this.markdownService.markdownToHtml(
                    message.substring(0, this.typedMessage().length + 1),
                ) as string,
            );
            setTimeout(
                () => this.typewriterMessage(messages),
                this.speedTyped(),
            );
        } else {
            this.isTyped.set(false);
        }
    }

    handlerSendMessage(message: string): void {
        this.sendMessage.emit(message);
        this.messageInput.nativeElement.value = '';
    }

    handlerDeleteMessage(message: ChatMessage): void {
        this.deleteMessage.emit(message);
    }

    handlerScroll($event: Event): void {
        this.scroll.emit($event);
    }
}
