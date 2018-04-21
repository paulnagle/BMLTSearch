import { Component,
	       ViewChild }               from '@angular/core';
import { Nav,
	       Platform,
				 MenuController }          from 'ionic-angular';
import { StatusBar }               from '@ionic-native/status-bar';
import { SplashScreen }            from '@ionic-native/splash-screen';
import { Storage }                 from '@ionic/storage';
import { TranslateService }        from '@ngx-translate/core';
import { Config }                  from './app.config';
import { TabsComponent }           from '../pages/tabs/tabs-component/tabs.component';
import { SettingsComponent }       from '../pages/settings/settings-component/settings.component';
import { GoogleMapsComponent }     from '../pages/google-maps/google-maps-component/google-maps.component';
import { FullMapComponent }        from '../pages/fullmap/fullmap-component/fullmap.component';
import { MeetinglistComponent }    from '../pages/meetinglist/meetinglist-component/meetinglist.component';
import { AddressSearchComponent}   from '../pages/address-search/address-search-component/address-search.component';
import { DoIHaveTheBmltComponent } from '../pages/do-i-have-the-bmlt/do-i-have-the-bmlt-component/do-i-have-the-bmlt.component';
import { ContactComponent }        from '../pages/contact/contact-component/contact.component';

@Component({
	templateUrl: './app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage = TabsComponent;
	pages: Array<{title: string, component: any, icon: string}>;


	constructor(
		private platform        : Platform,
		private translate       : TranslateService,
		private storage         : Storage,
		private statusBar       : StatusBar,
		private splashScreen    : SplashScreen,
		private config          : Config,
		private menuController  : MenuController
		) {
		this.initializeApp();

		this.translate.setDefaultLang('en');
		storage.get('language').then((value) => {
			if (value) {
				this.translate.use(value);
			} else {
				this.translate.use('en');
				storage.set('language', 'en');
			}
		});

		this.pages = [
		  { title: 'HOME',           component: TabsComponent,           icon: 'home' },
	    { title: 'SETTINGS',       component: SettingsComponent,       icon: 'settings'},
			{ title: 'GOOGLE_MAPS',    component: GoogleMapsComponent,     icon: 'map'},
			{ title: 'MEETINGLIST',    component: MeetinglistComponent,    icon: 'logo-buffer' },
			{ title: 'ADDRESSSEARCH',  component: AddressSearchComponent,  icon: 'logo-buffer' },
			{ title: 'DOIHAVETHEBMLT', component: DoIHaveTheBmltComponent, icon: 'logo-buffer' },
			{ title: 'CONTACT',        component: ContactComponent,        icon: 'contact'}
		];
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	openPage(page) {
		this.menuController.close();
		this.nav.setRoot(page.component);
	}
}