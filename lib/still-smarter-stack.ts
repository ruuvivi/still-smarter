import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';
import * as dotenv from 'dotenv';

dotenv.config();

export class StillSmarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, {
      ...props,
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.AWS_REGION
      }
  });

    // Domain name and subdirectory
    const domainName = process.env.DOMAIN_NAME ||  'default-domain.com';
    const siteSubPath = process.env.SITE_SUB_PATH || 'default-path';

    // Lookup the hosted zone in Route 53
    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: domainName,
    });

    // CloudFront requires SSL certificates to be issued in the us-east-1 region
    // Request the certificate from us-east-1 (Needs to be created manually in us-east-1 via ACM)
    const certificateArn = process.env.CERTIFICATE_ARN;
    if (!certificateArn) {
      throw new Error('CERTIFICATE_ARN environment variable is required');
    }

    const certificate = certificatemanager.Certificate.fromCertificateArn(
      this,
      'Certificate',
      certificateArn
    );

    // Create an S3 bucket to host the website
    const stillSmarterBucket = new s3.Bucket(this, 'stillSmarterBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
    });

    // CloudFront distribution
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'SiteDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: stillSmarterBucket,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
        aliases: [`${siteSubPath}.${domainName}`],
      }),
    });

    // Deploy website content to S3
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('./still-smarter-website')],
      destinationBucket: stillSmarterBucket,
      distribution,
      distributionPaths: ['/*'],
    });

    // Output the website URL
    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: distribution.distributionDomainName,
    });
  }
}