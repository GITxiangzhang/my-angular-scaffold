import {
  Inject, Optional, Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef,
  ViewContainerRef, ViewChild, ComponentRef, ComponentFactoryResolver, ComponentFactory
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { AlainI18NService, ALAIN_I18N_TOKEN, Menu, MenuService, SettingsService, TitleService } from '@delon/theme';
import { Router } from '@angular/router';
import { MsgComponent } from './test';

@Component({
  selector: 'app-dashboard-v1',
  templateUrl: './v1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  entryComponents: [MsgComponent]
})
export class DashboardV1Component implements OnInit {
  todoData: any[] = [
    {
      completed: true,
      avatar: '1',
      name: '苏先生',
      content: `请告诉我，我应该说点什么好？`,
    },
    {
      completed: false,
      avatar: '2',
      name: 'はなさき',
      content: `ハルカソラトキヘダツヒカリ`,
    },
    {
      completed: false,
      avatar: '3',
      name: 'cipchk',
      content: `this world was never meant for one as beautiful as you.`,
    },
    {
      completed: false,
      avatar: '4',
      name: 'Kent',
      content: `my heart is beating with hers`,
    },
    {
      completed: false,
      avatar: '5',
      name: 'Are you',
      content: `They always said that I love beautiful girl than my friends`,
    },
    {
      completed: false,
      avatar: '6',
      name: 'Forever',
      content: `Walking through green fields ，sunshine in my eyes.`,
    },
  ];

  webSite: any[];
  salesData: any[];
  offlineChartData: any[];
  private _menus: Menu[] | null;

  @ViewChild('MsgComponent', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<MsgComponent>;

  constructor(private http: _HttpClient,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private menuSrv: MenuService,
              private resolver: ComponentFactoryResolver,
              @Optional() @Inject(ALAIN_I18N_TOKEN) private i18nSrv: AlainI18NService,) {
  }

  private get menus() {
    if (this._menus) {
      return this._menus;
    }
    this._menus = this.menuSrv.getPathByUrl(this.router.url.split('?')[0], false);

    return this._menus;
  }

  ngOnInit() {
    this.http.get('/chart').subscribe((res: any) => {
      this.webSite = res.visitData.slice(0, 10);
      this.salesData = res.salesData;
      this.offlineChartData = res.offlineChartData;
      this.cdr.detectChanges();
    });
    console.log(this.menus);
    const paths = [];
    this.menus.forEach(item => {
      let title = item.text;
      if (item.i18n) title = item.i18n;
      paths.push({ title, link: (item.link && [item.link]) as string[] });
    });
    console.log(paths);
    const factory: ComponentFactory<MsgComponent> = this.resolver.resolveComponentFactory(MsgComponent);
    this.componentRef = this.container.createComponent(factory);
    console.log('componentRef',this.componentRef)
  }
}
