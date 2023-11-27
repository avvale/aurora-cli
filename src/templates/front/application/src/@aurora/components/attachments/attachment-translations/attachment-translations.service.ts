import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AttachmentMessages } from '../attachments.types';

@Injectable({
    providedIn: 'root',
})
export class AttachmentTranslationsService
{
    // custom messages
    messages: { [key: string]: AttachmentMessages; } = {};

    private createDefaultMessages(): AttachmentMessages
    {
        // return new instance to avoid reference
        return {
            alt         : new BehaviorSubject<string>('alt'),
            cancel      : new BehaviorSubject<string>('cancel'),
            crop        : new BehaviorSubject<string>('crop'),
            placeholder : new BehaviorSubject<string>('placeholder'),
            selectFamily: new BehaviorSubject<string>('selectFamily'),
            title       : new BehaviorSubject<string>('title'),
        };
    }

    private checkMessage(scope: string): void
    {
        if (!this.messages[scope])
        {
            this.messages[scope] = this.createDefaultMessages();
        }
    }

    setMessage(scope: string, key: keyof AttachmentMessages, message: string): void
    {
        this.checkMessage(scope);
        this.messages[scope][key].next(message);
    }

    getMessage(scope: string, key: keyof AttachmentMessages): Observable<string>
    {
        this.checkMessage(scope);
        return this.messages[scope][key]?.asObservable();
    }
}
