import { StorageConfig } from './StorageConfig';
import { Config } from './Config';
import yaml from 'js-yaml';
import {Storage} from '@google-cloud/storage';
import {uploadObject, updateBucketCors} from './Storage';
import fs from 'fs';
import {RssFeed} from './RssFeed';

async function main(): Promise<void> {

// Get document, or throw exception on error
try {
    const doc: Config = yaml.load(fs.readFileSync('config/application.yml', 'utf8')) as any;
    const feeds = doc.feeds.map(f => new RssFeed(f));
    const config = new StorageConfig(doc.storage);
    const storage = new Storage();
    await updateBucketCors(config.bucketName);
    await uploadObject(config.bucketName, config.destConfigFilename, JSON.stringify(feeds.map(f => f.toDto())));
    for (const feed of feeds) {
	    try {
      const articles = await feed.getArticles();
      const destination = `${config.destArticlePrefix}${feed.id}`;
      await uploadObject(config.bucketName, destination, JSON.stringify(articles));
	    } catch (err) {
		    console.error('Error getting articles', err);
	    }
    }
    // await createBucketWithStorageClassAndLocation(config.bucketName);
} catch (e) {
  console.log(e);
}

}

main();
