import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface IamRDSMonitoringRoleProps extends iam.RoleProps {}

/**
 * @TODO: Not yet supported Omit
 * https://github.com/aws/jsii/issues/4468
 * type omitKeys = 'eventPattern';
 * export interface IamRDSMonitoringRoleProps extends Omit<iam.RoleProps, 'eventPattern'> {}
 */

export class IamRDSMonitoringRole extends iam.Role {
  constructor(scope: Construct, id: string, props?: IamRDSMonitoringRoleProps) {
    super(scope, id, {
      ...props,
      assumedBy: new iam.ServicePrincipal('monitoring.rds.amazonaws.com'),
      managedPolicies: [
        {
          managedPolicyArn: 'arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole',
        },
      ],
    });
  }
}