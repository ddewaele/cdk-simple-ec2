#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkSimpleEc2Stack } from '../lib/cdk-simple-ec2-stack';

const app = new cdk.App();
new CdkSimpleEc2Stack(app, 'CdkSimpleEc2Stack', { 
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT, 
        region: process.env.CDK_DEFAULT_REGION    
    }, 
    tags: {
        foo: "bar"
    }
});