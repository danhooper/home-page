import {Storage} from '@google-cloud/storage';
import * as fs from 'fs';

export async function createBucketWithStorageClassAndLocation(bucketName: string, location: string = 'US') {
    const storage = new Storage();

    // For default values see: https://cloud.google.com/storage/docs/locations and
    // https://cloud.google.com/storage/docs/storage-classes
    const [bucket] = await storage.createBucket(bucketName, {
      location,
    });

    bucket.setCorsConfiguration([{origin: ['http://localhost:4200']}])
  
    console.log(
      `${bucket.name} created in ${location}`
    );
  }

  export async function updateBucketCors(bucketName: string): Promise<void> {
    const storage = new Storage();
    const response = await storage.getBuckets({maxResults: 1, prefix: bucketName});
    const [bucket] = response[0];
    await bucket.setCorsConfiguration([{origin: ['http://localhost:4200'], method: ['GET']}, {origin: ['https://frontend-yrznrlpvba-uk.a.run.app'], method: ['GET']}]);
    console.log('Updated bucket cors');
  }

  export function contentsChanged(destination: string, contents: string): boolean {
    const cacheDir = 'cache';
    const cacheFile = `${cacheDir}/${destination}.json`;

    if (fs.existsSync(cacheFile)) {
      const oldContents = fs.readFileSync(cacheFile, 'utf-8');

      if (contents === oldContents) {
        console.log(cacheFile, 'contents have not changed')
        return false;
      }
    }

    fs.writeFileSync(cacheFile, contents);

    return true;
  }
  
  export async function uploadObject(bucketName: string, destination: string, contents: string): Promise<void> {
    if (!contentsChanged(destination, contents)) {
      return;
    }

    const storage = new Storage();
    const file = storage.bucket(bucketName).file(destination)
    try {
        await file.save(contents);
    } catch(error) {
        console.log('Error saving file', error);
	return;
    }

    await file.setMetadata({
      cacheControl: 'public, max-age=300',
    });

    console.log('uploaded data to ', bucketName, destination);
  }
   
