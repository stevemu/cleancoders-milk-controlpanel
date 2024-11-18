export interface PumpRegister {
  setSpeed(speed: number): void;
}

export class MilkPump {
  private pumpRegister!: PumpRegister;

  public async engage(): Promise<void> {
    for (let i = 1; i <= 7; i++) {
      this.setSpeed(i);
      await this.wait(500);
    }
  }

  protected wait(time: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  protected setSpeed(speed: number): void {
    this.pumpRegister.setSpeed(speed);
  }

  public setPumpRegister(pumpRegister: PumpRegister): void {
    this.pumpRegister = pumpRegister;
  }
}
