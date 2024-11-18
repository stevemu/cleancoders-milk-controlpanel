import { ControlPanel } from './ControlPanel';
import { MilkerProcessImpl } from './MilkerProcessImpl';
import { MilkerControlPannelConnector } from './MilkerControlPannelConnector';

const process = new MilkerProcessImpl();
const connector = new MilkerControlPannelConnector(process);
const controlPanel = new ControlPanel();
controlPanel.setConnector(connector);
controlPanel.start();
