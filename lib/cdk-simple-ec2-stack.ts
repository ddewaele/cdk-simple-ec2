import * as cdk from 'aws-cdk-lib';
import { Instance, InstanceType, MachineImage, Peer, Port, SecurityGroup, UserData, Vpc } from 'aws-cdk-lib/aws-ec2';
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class CdkSimpleEc2Stack extends cdk.Stack {

  instance: Instance;
  sshSecurityGroup: SecurityGroup;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const vpc = Vpc.fromLookup(this, "VPC", {
      isDefault: true,
    });

    // Create a security group for SSH
    this.sshSecurityGroup = new SecurityGroup(this, 'SSHSecurityGroup', {
      vpc: vpc,
      description: 'Security Group for SSH',
      allowAllOutbound: true,
    });

    // Allow SSH inbound traffic on TCP port 22
    this.sshSecurityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(22));
    this.sshSecurityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(80));


    // Create reference to desired policy, in this case I want to set up a host that I can connect to through AWS Session Manager
    var instanceProfile = ManagedPolicy.fromAwsManagedPolicyName("AmazonS3ReadOnlyAccess");

    // Create the role resource
    const role = new Role(this, "bastion-role", {
      assumedBy: new ServicePrincipal("ec2.amazonaws.com"),
    });

    // Add the policy to the role
    role.addManagedPolicy(instanceProfile);

    const userData = UserData.forLinux();

      userData.addCommands(
      'yum update -y',
      'yum update -y',
      'dnf update -y',
      'dnf install java-21-amazon-corretto -y',
      'yum install -y httpd',
      'systemctl start httpd',
      'systemctl enable httpd',
      'TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"`',
      'REGION=`curl -H "X-aws-ec2-metadata-token: $TOKEN" -v http://169.254.169.254/latest/meta-data/placement/region`',
      'echo "<h1>Hello World from $(hostname -f) in ${REGION} </h1>" > /var/www/html/index.html',
    );

    // Create the EC2 instance
    this.instance = new Instance(this, 'Instance', {
      vpc: vpc,
      instanceType: new InstanceType('t2.micro'),
      machineImage: MachineImage.latestAmazonLinux2023(),
      userData: userData,
      securityGroup: this.sshSecurityGroup,
      role:role,
      keyName: 'ec2-test-keypair'
    })
  }

}
