import { MilkerProcess } from './MilkerProcess';

export class MilkerControlPannelConnector {
  constructor(private process: MilkerProcess) {}

  public cowsWaiting: string = '';
  public cowsMilked: string = '';
  public processingFlag: string = '';

  public startButtonClicked(): void {
    this.process.start();
  }

  public stopButtonClicked(): void {
    this.process.stop();
  }

  public updateDynamicValues(): void {
    this.process.updateDynamicValues(this);
  }
}
