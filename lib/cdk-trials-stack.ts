import * as cdk from 'aws-cdk-lib';
import { CfnOutput, Fn } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class CdkTrialsStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const suffix = this.initializeSuffix();
		const bucket = new Bucket(this, 'photos-bucket2', {
			bucketName: `photos-bucket-${suffix}`
		})
		console.log('bucket name: ' + bucket.bucketName)
		new CfnOutput(this, 'PhotosBucketName', {
			value: bucket.bucketName
		});


		new CfnOutput(this, 'stackId', {
			value: this.stackId
		});
		new CfnOutput(this, 'StackSuffix', {
			value: suffix
		});
	}

	private initializeSuffix(){
		const shortStackId = Fn.select(2, Fn.split('/', this.stackId));
		const suffix = Fn.select(4, Fn.split('-', shortStackId));
		return suffix;
	}





}
