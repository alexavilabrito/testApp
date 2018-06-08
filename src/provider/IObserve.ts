module Interfaces {
  export interface IObserver {
    ReceiveNotification<Array>(dataArrived: Array): void;
  }
}
