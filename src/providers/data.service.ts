import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

export interface Data {
    name: string;
    thumbnail: string;
}

export interface Field {
    field: string;
    type: any;
    type_enum?: any[]; // type is condidered as enumerated if you put a list of possible values.
}

@Injectable()
export class DataService {

    datas: any[]; // readonly
    colors: any[]; // readonly
    classes: any[]; // readonly
    fields: any[]; // readonly

    constructor(public http: Http) {
        this.datas = this.initDatas();
        this.colors = this.initColors();
        this.classes = this.initClasses();
        this.fields = this.initFields();
    }

    loadHeaders() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return headers;
    }

    /**
     * Init Datas names classes
     */
    private initDatas() {
        return [
            {
                name: 'Bluejay',
                thumbnail: 'bluejay.jpg'
            },
            {
                name: 'Chickadee',
                thumbnail: 'chickadee.jpg'
            },
            {
                name: 'Robin',
                thumbnail: 'robin.jpg'
            },
        ];
    }

    /**
     * Init Colors
     */
    private initColors() {
        return [
            'Black',
            'Blue',
            'Brown',
            'Gray',
            'Green',
            'Orange',
            'Pink',
            'Purple',
            'Red',
            'White',
            'Yellow'
        ];
    }

    /**
     * Init data classes : Reduce name of initialized data.
     */
    private initClasses() {
        var classes: string[] = [];
        this.datas.map((data) => classes.push(data.name));
        return classes;
    }

    /**
     * Init fields
     */
    private initFields() {
        return [
            {
                field: 'Wings color',
                type: 'text',
                type_enum: this.colors
            },
            {
                field: 'length',
                type: 'number',
            },
            {
                field: 'width',
                type: 'number',
            },
        ];
    }

    public getDatas() {
        return this.datas;
    }

    public getColors() {
        return this.colors;
    }

    public getClasses() {
        return this.classes;
    }

    public getFields() {
        return this.fields;
    }

    /**
     * Preprocessing on input : enum to number
     */
    private processInput(input: any[]) {
        this.fields.forEach((field, i, a) => {
            if (field['type_enum']) {
                input[i] = field['type_enum'].indexOf(input[i]);
            }
        });
        return input;
    }

    /**
     * Save data on database.
     */
    public addData(data) {
        var params = "input=" + this.processInput(data.input) + "&output=" + data.output;
        return new Promise(resolve => {
            this.http.post('http://localhost:3000/data/', params, { headers: this.loadHeaders() }).subscribe(data => {
                resolve(data.json());
            });
        })
    }

    /**
     * Training process
     */
    public train() {
        return new Promise(resolve => {
            this.http.get('http://localhost:3000/train/', { headers: this.loadHeaders() }).subscribe(data => {
                resolve(data.json());
            });
        })
    }

    /**
     * Predict the class of the given data
     */
    public predict(data) {
        var params = "input=" + this.processInput(data.input);
        return new Promise(resolve => {
            this.http.post('http://localhost:3000/predict/', params, { headers: this.loadHeaders() }).subscribe(data => {
                resolve(data.json());
            });
        })
    }

    /**
     * Get some stats about datas
     */
    public getAllDataStats() {
        return new Promise(resolve => {
            this.http.get('http://localhost:3000/data/', { headers: this.loadHeaders() }).subscribe(data => {
                resolve(data.json());
            });
        })
    }

    /**
     * Get some stats about a specific class data
     */
    public getDataStats(className: string) {
        return new Promise(resolve => {
            this.http.get('http://localhost:3000/data/' + className, { headers: this.loadHeaders() }).subscribe(data => {
                resolve(data.json());
            });
        })
    }    
}