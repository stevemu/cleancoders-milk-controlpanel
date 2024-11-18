import { MilkerControlPannelConnector } from './MilkerControlPannelConnector';

export interface MilkerProcess {
  start(): void;
  stop(): void;
  updateDynamicValues(connector: MilkerControlPannelConnector): void;
}
