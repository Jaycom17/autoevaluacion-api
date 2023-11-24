export interface Observer{
    notify(action: string, data: any): void;
}

export abstract class Article {
    private observers: Array<Observer> = new Array();

    public notify(action: string, data: any){
        for(let o of this.observers){
            o.notify(action, data);
        }
    }

    public addObserver(o: Observer){
        this.observers.push(o);
    }

    public removeObserver(o: Observer){
        this.observers.splice(this.observers.indexOf(o), 1);
    }
}