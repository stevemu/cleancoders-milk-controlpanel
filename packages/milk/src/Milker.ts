class UdderSeal {
  public check(): boolean {
    return true;
  }
}

class MilkPump {
  public engage(): void {
    // do nothing
  }
}

export interface Gate {
  open(): void;
  close(): void;
}

class CowGate implements Gate {
  public open(): void {
    // do nothing
  }

  public close(): void {
    // do nothing
  }
}

export class Milker {
  private seal = new UdderSeal();
  private pump = new MilkPump();
  private gate = new CowGate();

  public async milk(): Promise<void> {
    if (this.checkSeal()) {
      this.engagePump();
      await this.wait1Minute();
    }
    this.gate.open();
  }

  protected wait1Minute(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 60000));
  }

  protected engagePump(): void {
    this.pump.engage();
  }

  protected checkSeal(): boolean {
    return this.seal.check();
  }

  public setGate(gate: Gate): void {
    this.gate = gate;
  }
}
