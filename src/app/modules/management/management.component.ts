import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpensesService } from './../../services/expenses/expenses.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  expenses: any;
  user = sessionStorage.getItem('email');

  editId = '';

  isNewForm = false;
  isEditForm = false;
  excludeConf = false;
  expenseToExclude: any;

  showSimpleModal = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private expensesService: ExpensesService
  ) { }

  newExpenseForm = this.fb.group({
    item: ['', [Validators.required]],
    valor: ['', [Validators.required]]
  })

  editExpenseForm = this.fb.group({
    id: [''],
    item: [''],
    valor: ['']
  })

  ngOnInit(): void {
    if (!sessionStorage.getItem('token')){
      this.router.navigate(['/login'])
    }else{
      this.getExpenses();
    };
  }

  getExpenses(){
    this.expensesService.getExpenses(1, 10).subscribe(
      (response: any) => {
        this.expenses = response;
      }
    )
  }


  onSubmitNew() {
    const data = {
      date: Date.now(),
      item: this.newExpenseForm.value.item,
      value: this.newExpenseForm.value.valor,
      additionalInfo: {}
    }
    this.expensesService.setNewExpenses(data).subscribe(
      (response: any) => {
        if (response){
          this.getExpenses();
          this.isNewForm = false;
          this.showSimpleModal = false;
        }
      }
    )
  }

  onSubmitEdit() {
    const id = this.editExpenseForm.value.id ? this.editExpenseForm.value.id : this.editId;
    const data = {
      date: Date.now(),
      item: this.editExpenseForm.value.item,
      value: this.editExpenseForm.value.valor,
      additionalInfo: {}
    }
    this.expensesService.editExpenses(id, data).subscribe(
      (response: any) => {
        if (response){
          this.getExpenses();
          this.isEditForm = false;
          this.showSimpleModal = false;
          this.editExpenseForm.reset();
        }
      }
    )
  }

  edit(id: any){
    let data = this.expenses.find((i: { _id: any; }) => i._id === id);
    this.editId = id;
    this.editExpenseForm = this.fb.group({
      id: [data._id],
      item: [data.item],
      valor: [data.value]
    })
    this.isEditForm = true;
    this.showSimpleModal = true;
  }

  getExpense(id: any){
    this.expensesService.getExpense(id).subscribe(
      (response: any) => {
        if (response){
          this.excludeConf = true;
          this.showSimpleModal = true;
          this.expenseToExclude = response;
        }
      }
    )
  }

  exclude(id: any){
    this.expensesService.excludeExpenses(id).subscribe(
      (response: any) => {
        if (response){
          this.expenseToExclude = '';
          this.excludeConf = false;
          this.showSimpleModal = false;
          this.getExpenses();
        }
      }
    )
  }

  logoff(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('_id');
    this.router.navigate(['/login']);
  }

}
