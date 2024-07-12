import { Duration } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

/**
 * @TODO: Not yet supported Omit
 * https://github.com/aws/jsii/issues/4468
 * type omitKeys = 'eventPattern';
 * export interface IamRDSMonitoringRoleProps extends Omit<iam.RoleProps, 'managedPolicies'> {}
 */
interface IamRDSMonitoringRoleProps {
  readonly roleName?: string;
  readonly managedPolicies?: iam.IManagedPolicy[];
  readonly permissionsBoundary?: iam.IManagedPolicy;
  readonly maxSessionDuration?: Duration;
  readonly inlinePolicies?: {
    [name: string]: iam.PolicyDocument;
  };
  readonly path?: string;
  readonly description?: string;
}

/**
 * @TODO: Not yet supported Omit
 * https://github.com/aws/jsii/issues/4468
 * type omitKeys = 'eventPattern';
 * export interface IamRDSMonitoringRoleProps extends Omit<iam.RoleProps, 'eventPattern'> {}
 */

export class IamRDSMonitoringRole extends iam.Role {
  constructor(scope: Construct, id: string, props?: IamRDSMonitoringRoleProps) {
    super(scope, id, {
      roleName: props?.roleName,
      permissionsBoundary: props?.permissionsBoundary,
      maxSessionDuration: props?.maxSessionDuration,
      path: props?.path,
      description: (() => {
        return props?.description ?? 'rds monitoring role';
      })(),
      assumedBy: new iam.ServicePrincipal('monitoring.rds.amazonaws.com'),
      managedPolicies: [
        {
          managedPolicyArn: 'arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole',
        },
      ],
    });
  }
}