import { describe, expect, it } from '@jest/globals';
import { Gate, Milker } from './Milker';

describe('Milker', () => {
  let pumping: boolean = false;
  let open: boolean = false;

  it('should milk', async () => {
    class MilkerTest extends Milker {
      protected engagePump(): void {
        pumping = true;
      }
      protected checkSeal(): boolean {
        return true;
      }
      protected async wait1Minute(): Promise<void> {
        return undefined;
      }
    }
    class MockGate implements Gate {
      public open(): void {
        open = true;
      }
      public close(): void {
        open = false;
      }
    }

    const milker = new MilkerTest();
    milker.setGate(new MockGate());
    await milker.milk();
    expect(pumping).toBe(true);
    expect(open).toBe(true);
  });
});
