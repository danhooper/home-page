import type { IRssFeed } from '@dh-home-page/models/RssFeed';

export interface Config {
    feeds: IRssFeed[];
}

export function isConfig(value: unknown): value is Config {
    if (!value) {
        return false;
    }

    return typeof value === 'object' && 'feeds' in value && typeof value.feeds === 'object';
}
