import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStorage logic
const s3Bucket = process.env.ATTACHMENTS_S3_BUCKET
const urlExp = process.env.SIGNED_URL_EXPIRATION

class AttachmentUtils{
    constructor(
        private readonly s3 = new XAWS.S3({ signatureVersion: 'v4' }),
        private readonly bucketName = s3Bucket
    ) {}

    getAttachmentUrl(todoId: string) {
        return `https://${this.bucketName}.s3.amazonaws.com/${todoId}`
    }

    generateUploadUrl(todoId: string): string {
        const url = this.s3.getSignedUrl('putObject', {
            Bucket: this.bucketName,
            Key: todoId,
            Expires: urlExp
        })
        return url as string
    }
}

export default AttachmentUtils
