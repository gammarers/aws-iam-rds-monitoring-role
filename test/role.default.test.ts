import { App, Stack } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as iam from 'aws-cdk-lib/aws-iam';
import { IamRDSMonitoringRole } from '../src';

describe('IamRDSMonitoringRole default Testing', () => {

  const app = new App();
  const stack = new Stack(app, 'TestingStack', {
    env: {
      account: '123456789012',
      region: 'us-east-1',
    },
  });

  const role = new IamRDSMonitoringRole(stack, 'IamRDSMonitoringRole');

  it('Is IAM Role', async () => {
    expect(role).toBeInstanceOf(iam.Role);
  });

  const template = Template.fromStack(stack);

  it('Should match iam role.', async () => {
    template.hasResourceProperties('AWS::IAM::Role', Match.objectEquals({
      Description: 'rds monitoring role',
      AssumeRolePolicyDocument: Match.objectEquals({
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'monitoring.rds.amazonaws.com',
            },
          },
        ],
      }),
      ManagedPolicyArns: [
        'arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole',
      ],
    }));
  });

  it('Should match snapshot.', async () => {
    expect(template.toJSON()).toMatchSnapshot();
  });

});