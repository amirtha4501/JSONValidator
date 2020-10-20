import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-validator',
    templateUrl: './validator.component.html',
    styleUrls: ['./validator.component.css']
})
export class ValidatorComponent implements OnInit {

    jsonForm: FormGroup;
    customForm;
    detail: {};
    entries;

    constructor(
        private router: Router,
        private fb: FormBuilder
    ) {
        this.createJsonForm();
        this.customForm = this.fb.array([]);
    }

    ngOnInit(): void {
    }

    createJsonForm() {
        this.jsonForm = this.fb.group({
            jsonInput: ['', [Validators.required]]
        });
    }

    private addItem(item) {
        const fc = this.fb.control(item, [Validators.required]);
        this.customForm.push(fc);
    }

    createCustomForm() {
        for (let i = 0; i < this.entries.length; i++) {
            if (this.entries[i][0] !== "Title" && this.entries[i][0] !== "title") {
                this.addItem(i);
            }
        }
    }

    calculator(jsonInput: object) {
        this.entries = Object.entries(jsonInput);
    }

    onSubmit() {
        this.detail = this.jsonForm.value;
        try {
            var value = JSON.parse(this.detail['jsonInput']);
            console.log(value);
            this.calculator(value);
        } catch (err) {
            alert(err);
        }
        this.createCustomForm();
    }


}
