import AWS, { AWSError, S3 } from 'aws-sdk';
import { EncryptedText } from './types';

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
  region: process.env.REACT_APP_AWS_REGION || 'ap-northeast-1',
});

const bucket = process.env.REACT_APP_S3_BUCKET || 'your-s3-bucket';

const handleAWSError = (error: AWSError, action: string) => {
  console.error(`Failed to ${action} file from S3:`, error);
  throw error;
};

export const uploadToS3 = async (
  s3DataKey: string,
  encryptedData: EncryptedText,
): Promise<void> => {
  const uploadParams: S3.PutObjectRequest = {
    Bucket: bucket,
    Key: s3DataKey,
    Body: JSON.stringify(encryptedData),
    ContentType: 'application/json',
    ACL: 'public-read',
  };

  await s3
    .upload(uploadParams)
    .promise()
    .catch((error) => {
      handleAWSError(error, 'upload');
    });
};

export const downloadFromS3 = async (
  s3DataKey: string,
): Promise<EncryptedText> => {
  const downloadParams: S3.GetObjectRequest = {
    Bucket: bucket,
    Key: s3DataKey,
  };

  const result = await s3
    .getObject(downloadParams)
    .promise()
    .catch((error) => {
      handleAWSError(error, 'download');
    });
  if (!result) {
    throw new Error('Data not found');
  }
  const content: EncryptedText = JSON.parse(result.Body as string);
  return content;
};
