import { MilkerProcess } from './MilkerProcess';
import { MilkerControlPannelConnector } from './MilkerControlPannelConnector';

export class MilkerProcessImpl implements MilkerProcess {
  public started: boolean = false;
  public cowMilked: number = 0;
  public cowsWaiting: number = 100;

  public start(): void {
    this.started = true;
  }

  public stop(): void {
    this.started = false;
  }

  public updateDynamicValues(connector: MilkerControlPannelConnector): void {
    if (this.started) {
      this.cowMilked++;
      this.cowsWaiting--;
    }
    connector.cowsWaiting = `${this.cowsWaiting}`;
    connector.cowsMilked = `${this.cowMilked}`;
    connector.processingFlag = this.started ? '...processing...' : 'STOPPED';
  }
}
