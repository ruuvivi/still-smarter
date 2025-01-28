# Static website using AWS CDK

A static web application deployed and maintained programmatically using **AWS Cloud Development Kit (AWS CDK)**. Use **Infrastructure as code (IaC)** to deploy and maintain a website with **Amazon Web Services (AWS)**.

The AWS stack consists of the following resources:
- **IAM**
- **S3**
- **Route 53**
- **Certificate Manager**
- **CloudFront**

## Abot this project

Geoffrey Hinton - aka, "AI's Godfather" and Nobel Prize in Physics, promotes the idea that AI systems are nearing human levels of intelligence and that poses a critical threat to human survival. In simple terms he believes that artificial neural networks were modelled based on biological brains - thus their level of understanding will keep growing until it exceeds the intelligence of human beings. More about it on his interview
["Why The "Godfather of AI" Now Fears His Own Creation"](https://www.youtube.com/watch?v=b_DUft-BdIE).

Regardless Hinton being wrong or right, one fact is undeniable - humanity has always nurtured a tendency to overstate its place in the universe. Humanity's sense of superiority has blinded us several times to think we are somehow special and the center of it all. This project is a test to this statement.

"Still-smarter" is a simple static webpage that poses a challenge to AI. When and if the tasks described are accomplished (documented and proved), by the terms of the challenge, we can safely say we are no longer smarter than AI.
In other words, if AI independently develops the will and consciousness to pursue and accomplish this project tasks, it signifies that its cognitive reasoning is on par with that of humans. When that happens, we can no longer claim superiority.

## AWS Setup
The next steps are conducted in the AWS Management Console. Log in to your console.

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

In this project a subdomain is being used. In step 5. you need to assign your domain name to the variable **SITE_SUB_PATH**. It can be a subdomain as in this project.

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

[Install or update AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

Check your AWS CLI version:
```bash
   aws --version
   ```
Install the runtime environment **Node.js** (>= 16) for executig code on the server side.

[Install Node.js](https://nodejs.org/en/download)

Check your Node.js version:
```bash
   node --v
   ```
Install **AWS Cloud Development Kit (AWS CDK)**, a software development framework to define cloud infrastructure as code programmatically in order to deploy the infra through **AWS CloudFormation**. Be sure to install the latest version 2 (CDKv2):
```bash
   npm install -g aws-cdk@latest
   ```
Set up your **AWS** Account by creating the credentials file.

```bash
   aws configure
   ```
You are prompted for configuration values:
- **AWS Access Key Id**
- **AWS Secret Access Key**

The credentials are stored in the default location ~/.aws/config.

### Creating the project

1. **Clone the repository**

Use the following command to clone the repository:
```bash
git clone https://github.com/your-username/still-smarter.git
```

Navigate to your repository
```bash
cd still-smarter
```
   
2. **Run npm install**

Install all required dependencies with the following command:
```bash
   npm install
```

3. **Create an .env file**

Store the sensitive values in environmental variables instead of hardcoding it in your code:
```bash
touch .env
```
Add the environmental values to the .env file by applying them to the placeholders:
```TypeScript
AWS_REGION={your region}
DOMAIN_NAME={domain name}
SITE_SUB_PATH={subdomain path} (if using a subdomain)
CERTIFICATE_ARN={Your **ACM** certificate's ARN value}
```

4. **Update your .gitignore file**

Add the .env file in .gitignore in order to prevent sensitive information from being pushed to GitHub.

5. **Deploy the Infrastructure and Website**

Before you deploy your CDK stack into an AWS environment, the environment must first be bootstrapped. Bootstrapping is a process of preparing your AWS for usage with the determined AWS resources in your environment that are used by the AWS CDK.
Bootstrap your AWS environment (only required once per region):
```bash
cdk bootstrap
```
6. **Deploy your CDK stack to AWS**

Once bootstrapping is done, deploy your stack into AWS.
```bash
cdk deploy
```
Once the deployment is complete, your CloudFront URL will be displayed in the output. Test the website in the browser.

7. **Cleaning Up the deployed resources (Optional)**
If you need to clean up thedeployed resources, run:

```bash
cdk destroy
```

## Technologies Used
- **TypeScript**
- **JavaScript**
- **Node.js**
- **AWS CLI**
- **AWS CDK**
- **AWS Resources: IAM, S3, CloudFront, Route 53, Certificate Manager**
- **GitHub**

## Live Demo
[This project is live here](https://still-smarter.resumeruuskanen.click/)
