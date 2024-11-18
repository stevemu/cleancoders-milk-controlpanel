import { describe, expect, it } from '@jest/globals';
import { MilkPump, PumpRegister } from './MilkPump';

class MilkPumpRegisterDummy implements PumpRegister {
  setSpeed(speed: number): void {}
}

describe('MilkerPump', () => {
  let action = '';

  it('engage pump gradually', async () => {
    class MilkerPumpTest extends MilkPump {
      protected setSpeed(speed: number): void {
        action += speed;
      }
      protected async wait(): Promise<void> {
        action += 'w';
      }
    }

    const pump = new MilkerPumpTest();
    pump.setPumpRegister(new MilkPumpRegisterDummy());
    await pump.engage();
    expect(action).toBe('1w2w3w4w5w6w7w');
  });
});
