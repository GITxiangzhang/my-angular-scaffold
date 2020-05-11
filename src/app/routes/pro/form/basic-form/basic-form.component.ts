import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient, Menu, MenuService } from '@delon/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFormComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  private _menus: Menu[] | null;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private router: Router,
              private menuSrv: MenuService) {}

  private get menus() {
    if (this._menus) {
      return this._menus;
    }
    this._menus = this.menuSrv.getPathByUrl(this.router.url.split('?')[0], false);

    return this._menus;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      date: [null, [Validators.required]],
      goal: [null, [Validators.required]],
      standard: [null, [Validators.required]],
      client: [null, []],
      invites: [null, []],
      weight: [null, []],
      public: [1, [Validators.min(1), Validators.max(3)]],
      publicUsers: [null, []],
    });
    console.log(this.menus);
    const paths = [];
    this.menus.forEach(item => {
      let title = item.text;
      if (item.i18n) title = item.i18n;
      paths.push({ title, link: (item.link && [item.link]) as string[] });
    });
    console.log(paths);
  }

  submit() {
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      this.msg.success(`提交成功`);
      this.cdr.detectChanges();
    }, 1000);
  }
}
