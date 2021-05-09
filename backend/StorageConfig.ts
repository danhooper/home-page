export interface IStorageConfig {
    bucketName: string;
    destConfigFilename: string;
    destArticlePrefix: string;
}

export class StorageConfig implements IStorageConfig {
    bucketName: string;
    destConfigFilename: string;
    destArticlePrefix: string;

    constructor(config: IStorageConfig) {
        this.bucketName = config.bucketName;
        this.destConfigFilename = config.destConfigFilename;
        this.destArticlePrefix = config.destArticlePrefix;
    }
}