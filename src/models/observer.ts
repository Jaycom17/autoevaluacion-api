export interface Observer{
    notify(user: any): void;
}

export abstract class Article {
    private observers: Array<Observer> = new Array();

    public notify(user: any){
        for(let o of this.observers){
            o.notify(user);
        }
    }

    public addObserver(o: Observer){
        this.observers.push(o);
    }

    public removeObserver(o: Observer){
        this.observers.splice(this.observers.indexOf(o), 1);
    }
}