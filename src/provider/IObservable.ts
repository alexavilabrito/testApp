module Interfaces {
  export interface IObservable {
    RegisterObserver(Observer: IObserver);

    RemoveObserver(Observer: IObserver);

    NotifyObservers();
  }
}




