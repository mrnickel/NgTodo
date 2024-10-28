import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { LiveUpdate } from '@capawesome/capacitor-live-update';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

type Response = {
  liveBundleId: string;
  bundleUrl: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoListComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ng-todo';

  constructor(private http: HttpClient) {
    
    const myAppConfig = {}; // Replace {} with the appropriate initialization for myAppConfig
    console.log("here: ", (window as any).myAppConfig);
  }
  
  ngOnInit(): void {
    const myAppConfig = (window as any).myAppConfig;
    console.log("checking for updates:", myAppConfig);

    LiveUpdate.getBundle()
      .then(({bundleId}) => {
        console.log('current bundle id', bundleId);
        if (bundleId === myAppConfig.liveBundleId) { 
          throw new Error("NoUpdateRequired")
        }

        console.log('downloading new bundle:', myAppConfig.liveBundleId);
        return LiveUpdate.downloadBundle({
          url: myAppConfig.bundleUrl,
          bundleId: myAppConfig.liveBundleId
        })
    })
    .then(() => {
      console.log('setting new bundle:', myAppConfig.liveBundleId)
      return LiveUpdate.setBundle({ bundleId: myAppConfig.liveBundleId });
    }).then(() => {
      console.log('reloading app')
      return LiveUpdate.reload();
    })
    .catch((e) => {
      if (e.message === "NoUpdateRequired") {
        console.log('No update required');
        LiveUpdate.ready();
      }
      else {
        console.error('Error updating app', e);
      }
    });

    // this.checkForUpdates().then(() => {
    //   LiveUpdate.ready()
    // })
  }

  // async checkForUpdates() {
  //   const {liveBundleId, bundleUrl} = await firstValueFrom(this.http.get<Response>(`${environment.apiUrl}/staticfiles/index.json`));
  //   console.log(`${environment.apiUrl}/staticfiles/index.json`)
    
  //   console.log('checking for app updates');
  //   const {bundleId}= await LiveUpdate.getBundle();
  //   console.log(String(bundleId), liveBundleId, bundleUrl)
  //   if (liveBundleId !== String(bundleId)) {
  //     console.log('update the bundle', liveBundleId, bundleUrl);
  //     try {

  //       const res2 = await LiveUpdate.downloadBundle({
  //         url: bundleUrl,
  //         bundleId: liveBundleId
  //       })
  //       console.log(res2);
  //     } catch (e) {
  //       console.error("caught", e)
  //     }
  //     console.log('set the bundle', liveBundleId);
  //     try {
  //       await LiveUpdate.setBundle({bundleId: liveBundleId});

  //     } catch (e) {
  //       console.error("caught", e)
  //     }
  //     await LiveUpdate.reload();
  //   }
  //   else {
  //     console.log("nothing to see here");
  //   }
  // }
}
