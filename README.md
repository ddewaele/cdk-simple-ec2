# cdk-simple ec2

This repository contains a Cloud Development Kit (CDK) stack that automates the deployment of a simple Amazon EC2 instance with a configured security group for SSH access. This CDK stack is ideal for users who want to quickly set up a basic EC2 instance in AWS with the necessary configurations for web serving and SSH access.

## Features

- Default VPC Selection: Automatically selects the default VPC for deployment.
- Security Group Configuration: Sets up a security group to allow SSH (TCP port 22) and HTTP (TCP port 80) inbound traffic.
- Role and Policy Assignment: Creates an EC2 role with AmazonS3ReadOnlyAccess managed policy.
- User Data Script: Includes a user data script to install necessary packages and set up a basic HTTP server.
- EC2 Instance Creation: Deploys a t2.micro EC2 instance with the latest Amazon Linux AMI and attaches the created role and security group.

## Prerequisites

- AWS account with appropriate permissions to create the described resources.
- AWS CDK installed and configured on your machine.
- Basic understanding of TypeScript and AWS CDK.

## Installation & Deployment

- Clone the repository to your local machine.
- Navigate to the repository directory.
- Run npm install to install necessary dependencies.
- Deploy the stack to your AWS account using cdk deploy.


## Usage

After deployment, the EC2 instance will be accessible via SSH. The HTTP server running on the instance will display a simple "Hello World" message.

## Customization

You can modify the stack to suit your specific requirements. For instance, changing the instance type, machine image, or adjusting the user data script.

## Security

Ensure that your AWS credentials and key pairs are managed securely. Review and modify the security group rules according to your security policies.

## Support

For issues or enhancements, please open an issue in the repository.

Note: This README assumes that users have basic knowledge of AWS services and CDK. It is important to keep security best practices in mind when using this stack in a production environment.


The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
