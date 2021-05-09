import { IStorageConfig } from './StorageConfig';
import { IRssFeed } from './RssFeed';

export interface Config {
    feeds: IRssFeed[];
    storage: IStorageConfig;
}