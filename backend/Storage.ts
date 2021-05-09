import {Storage} from '@google-cloud/storage';

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
    await bucket.setCorsConfiguration([{origin: ['http://localhost:4200'], method: ['GET']}]);
    console.log('Updated bucket cors');
  }
  
  export async function uploadObject(bucketName: string, destination: string, contents: string): Promise<void> {
    const storage = new Storage();
    const file = storage.bucket(bucketName).file(destination)
    await file.save(contents);
    await file.setMetadata({
      cacheControl: 'public, max-age=300',
    })
    console.log('uploaded data to ', bucketName)
  }
   