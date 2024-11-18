import { describe, expect, it } from '@jest/globals';
import { MilkerProcessImpl } from '../MilkerProcessImpl';
import { MilkerControlPannelConnector } from '../MilkerControlPannelConnector';

class ConnectorSpy extends MilkerControlPannelConnector {}

describe('MilkerProcessImpl', () => {
  it('should start and stop', () => {
    const process = new MilkerProcessImpl();
    const connector = new ConnectorSpy(process);
    process.start();
    expect(process.started).toBe(true);
    process.updateDynamicValues(connector);
    expect(process.cowMilked).toBe(1);
    expect(process.cowsWaiting).toBe(99);
    expect(connector.cowsWaiting).toBe('99');
    expect(connector.cowsMilked).toBe('1');
    expect(connector.processingFlag).toBe('...processing...');
    process.stop();
    process.updateDynamicValues(connector);
    expect(process.started).toBe(false);
    expect(connector.processingFlag).toBe('STOPPED');
  });
});
