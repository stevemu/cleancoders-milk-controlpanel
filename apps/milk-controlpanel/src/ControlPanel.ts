import { MilkerControlPannelConnector } from './MilkerControlPannelConnector';

const blessed = require('blessed');

export class ControlPanel {
  public screen: any;
  private waitingBox: any;
  private milkedBox: any;
  private stateBox: any;
  private startButton: any;
  private stopButton: any;
  private connector!: MilkerControlPannelConnector;

  constructor() {
    this.setupScreen();
    this.createWaitingBox();
    this.createMilkBox();
    this.createStateBox();
    this.createStartButton();
    this.createStopButton();
    this.setupExitKeys();
    this.screen.render();
  }

  setConnector(connector: MilkerControlPannelConnector) {
    this.connector = connector;
    this.startButton.on('click', () => {
      this.connector.startButtonClicked();
    });
    this.stopButton.on('click', () => {
      this.connector.stopButtonClicked();
    });
  }

  async start() {
    while (true) {
      this.connector.updateDynamicValues();
      this.setDynamicLabels();
      this.screen.render();
      await this.sleep();
    }
  }

  async sleep() {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  setDynamicLabels() {
    this.waitingBox.setContent(this.connector.cowsWaiting);
    this.milkedBox.setContent(this.connector.cowsMilked);
    this.stateBox.setContent(this.connector.processingFlag);
  }

  setupScreen() {
    this.screen = blessed.screen({
      smartCSR: true,
      debug: true,
    });
    this.screen.bg = 'white';
    this.screen.title = 'milk panel';
  }

  createWaitingBox() {
    this.waitingBox = blessed.box({
      top: 0,
      left: 0,
      width: 20,
      height: 3,
      content: '',
      tags: true,
      border: {
        type: 'line',
      },
      style: {
        fg: 'white',
        border: {
          fg: 'black',
        },
      },
    });

    this.screen.append(this.waitingBox);
  }

  createMilkBox() {
    this.milkedBox = blessed.box({
      top: 6,
      left: 0,
      width: 20,
      height: 3,
      content: '',
      tags: true,
      border: {
        type: 'line',
      },
      style: {
        fg: 'white',
        border: {
          fg: 'black',
        },
      },
    });

    this.screen.append(this.milkedBox);
  }

  createStateBox() {
    this.stateBox = blessed.box({
      top: 3,
      left: 0,
      width: 20,
      height: 3,
      content: '',
      tags: true,
      border: {
        type: 'line',
      },
      style: {
        fg: 'white',
      },
    });

    this.screen.append(this.stateBox);
  }

  createStartButton() {
    this.startButton = blessed.button({
      top: 10,
      left: 0,
      width: 20,
      height: 3,
      content: 'Start',
      tags: true,
      border: {
        type: 'line',
      },
      style: {
        fg: 'white',
        border: {
          fg: 'black',
        },
      },
    });

    this.screen.append(this.startButton);
  }

  createStopButton() {
    this.stopButton = blessed.button({
      top: 14,
      left: 0,
      width: 20,
      height: 3,
      content: 'Stop',
      tags: true,
      border: {
        type: 'line',
      },
      style: {
        fg: 'white',
        border: {
          fg: 'black',
        },
      },
    });

    this.screen.append(this.stopButton);
  }

  setupExitKeys() {
    this.screen.key(['escape', 'q', 'C-c'], () => {
      return process.exit(0);
    });
  }
}
