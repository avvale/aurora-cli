import { effect, signal, WritableSignal } from '@angular/core';
import { log } from './log';

export class Counter
{
    private static counters: Map<string, WritableSignal<number>> = new Map();
    private static counterIntervals: Map<string, any> = new Map();
    private static counterValues: Map<string, WritableSignal<string>> = new Map();

    static getCounterValue(
        key: string = 'default',
    ): WritableSignal<string>
    {
        effect(() =>
        {
            const counter = Counter.counters.get(key);
            const counterValue = Counter.counterValues.get(key);

            const minutes = Math.floor(counter() / 60);
            const seconds = counter() % 60;

            counterValue.set(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

            return counterValue;
        });

        if (!Counter.counters.has(key))
        {
            Counter.counters.set(key, signal(0));
            Counter.counterValues.set(key, signal('00:00'));
        }

        return Counter.counterValues.get(key);
    }

    static getCounterInterval(
        key: string = 'default',
    ): any
    {
        return Counter.counterIntervals.get(key);
    }

    static getCounter(
        key: string = 'default',
    ): WritableSignal<number>
    {
        return Counter.counters.get(key);
    }

    static startCounter(
        key: string = 'default',
    ): void
    {
        Counter.counterIntervals.set(
            key,
            setInterval(() =>
                {
                    const counter = Counter.counters.get(key);
                    counter?.set(counter() + 1);
                    if (!counter) log('[DEBUG] - Counter not found for key:', key);
                },
                1000
            ));
    }

    static stopCounter(
        key: string = 'default',
    ): void
    {
        clearInterval(this.counterIntervals.get(key));
        this.counterIntervals.delete(key);
    }

    static resetCounter(
         key: string = 'default',
    ): void
    {
        const counter = Counter.counters.get(key);
        counter?.set(0);
        if (!counter) log('[DEBUG] - Counter not found for key:', key);
    }
}
