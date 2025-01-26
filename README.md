# Static website using AWS CDK

A static **Typscript** web application deployed and maintained programmatically using **AWS Cloud Development Kit (AWS CDK)**. Use **Infrastructure as code (IaC)** to deploy and maintain a website with **Amazon Web Services (AWS)**.

The AWS stack consists of the following resources:
- **IAM**
- **CloudFormation**
- **S3**
- **CloudFront**
- **Route 53**
- **Certificate Manager**.

## Features

A single web page containing a manifesto about AI taking this website down. There is a counter, which depicts the amount of days that has passed since the website has been running, and AI hasn't taken the website down.

## AWS Setup
The next steps are conducted in the AWS Console. Log in to your console.

### Create an IAM User
   - Go to IAM in AWS console and navigate to "Users"
   - Assign appropriate permissions (e.g., S3 read/write access). Also in permissions select "Attach policies directly".
   - Generate an Access Key ID and Secret Access Key for the user, save the CSV file to access these later in "Setup your **AWS** Account".

### Create a domain name on Route53
   - In the AWS Management Console navigate to **Route 53**.
   - Navigate to Domains -> registered domains -> register domains.
   - Choose a domain name and pricing.
   - Add to cart an available domain of your choosing.
   - Fill in contact details and choose settings that suit you (automatic renewal of domain etc.).
   - Complete the domain order.
   - Wait for the domain to be registered.

In this project a subdomain is being used. In step 4., you need to assign your domain name to the variable **SITE_SUB_PATH**. It can be a subdomain as in this project.

### Request Certificate from ACM
Due to the regional requirement of CloudFront and potential validation issues, many users prefer manually creating the certificate and referencing the ARN in their CDK stacks, as in this project.
   - From the top right corner select US East Virginia as your region for this step.
   - In the AWS Management Console navigate to **AWS Certificate Manager**.
   - Click on "Request" -> Choose “Request a public certificate”
   - Settings are as follows: Domain name = your domain name, "Validation method" = DNS validation, "Key algorithm" = RSA 2048.
   - Finalize by clicking "Request" and wait for the validation.
   - Click on your new certificate and click on “Create records in Route 53”. Tick the checkbox for your domain name, then finalize with “Create Record”.
   - Wait for the domain validation status to be "success".

## Deployment to AWS
The next steps are conducted programmatically. Open a console.

### Prerequisites
Install **AWS Command Line Interface (AWS CLI)** to manage your AWS services from the command line and automate them through scripts.
[Install or update AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html/)
Check your AWS CLI version:
```bash
   aws --v
   ```
Install the runtime environment **Node.js** (>= 16) for executig code on the server side.
[Install Node.js](https://nodejs.org/en/download)

Check your Node.js version:
```bash
   node --v
   ```
Install **AWS Cloud Development Kit (AWS CDK)** software development framework to define cloud infrastructure as code programmatically in order to deploy the infra through **AWS CloudFormation**. Be sure to install the latest version 2 (CDKv2).
```bash
   npm install -g aws-cdk@latest
   ```
Setup your **AWS** Account by creating the credentials file. You are prompted for configuration values **AWS Access Key Id** and **AWS Secret Access Key**. The credentials are stored in the default location ~/.aws/config.
```bash
   aws configure
   ```

1. **Create a New AWS CDK Project**
   - Create a new directory and navigate into it
```bash
   mkdir still-smarter && cd still-smarter
   ```
   - Initialize the CDK app with TypeScript:
```bash
   cdk init app --language=typescript
   ```
   
2. **Install Required AWS CDK Modules**
   - This project uses **S3**, **CloudFront**, **route 53**, **Certificate  Manager**:
```bash
   npm install @aws-cdk/aws-s3 @aws-cdk/aws-s3-deployment @aws-cdk/aws-cloudfront @aws-cdk/aws-route53 @aws-cdk/aws-certificatemanager
```

3. **Install the dotenv Library**
- Install dotenv library:
```bash
npm install dotenv
```

4. **Define the Infrastructure in AWS CDK**
- Set up the file lib/still-smarter-stack.ts.

6. **Create an .env file**
Store the sensitive values in environmental variables instead of hardcoding it in your code:
```bash
touch .env
```
Add the environmental values to the .env file
```TypeScript
AWS_REGION=(your region)
DOMAIN_NAME=(domain / subdomain name)
SITE_SUB_PATH=(domain / subdomain path)
CERTIFICATE_ARN=(Your **ACM** certificate's ARN value)
    ```

5. **Update your .gitignore file**
Add the .env file in .gitignore in order to prevent sensitive information from being pushed to GitHub.


7. **Create the Website Content**
Inside the project root, create a folder named still-smarte-website:
```bash
mkdir still-smarte-website
    ```
Add an index.html file inside the still-smarte-website folder and add the website content in **HTML**.

8. **Deploy the Infrastructure and Website**
Before you deploy your CDK stack into an AWS environment, the environment must first be bootstrapped. Bootstrapping is a process of preparing your AWS for usage with the determined AWS resources in your environment that are used by the AWS CDK.
Bootstrap your AWS environment (only required once per region):
```bash
cdk bootstrap
```
9. **Deploy your CDK stack to AWS**
Ones bootstrapping is done, deploy your stack into AWS.
```bash
cdk deploy
```
Once the deployment is complete, your CloudFront URL will be displayed in the output. Test the website in the browser.

9. **Cleaning Up the deployed resources (Optional)**
If you need to clean up thedeployed resources, run:

```bash
cdk destroy
```

## Technologies Used
- **TypeScript**
- **Node.js**
- **AWS CLI**
- **AWS CDK**
- **Amazon Web Services: CloudFormaton, S3, CloudFront, Route 53, Certificate Manager**
- **GitHub**

## Live Demo
[This project is live here](https://still-smarter.resumeruuskanen.click/)