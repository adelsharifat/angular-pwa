import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularPwa';
  apiData:any;
  constructor(private http:HttpClient,private swUpdate:SwUpdate,private appRef:ApplicationRef){
    this.updateClient();
  }

  ngOnInit():void{
    this.http.get<any>('http://dummy.restapiexample.com/api/v1/employees').subscribe(
      res=>this.apiData = res.data,
      err=>console.log(err)
    );
  }

  updateClient(){
    if(!this.swUpdate.isEnabled){
      console.log('not enabled')
      return;
    }
    this.swUpdate.versionUpdates.subscribe((event)=>{
      console.log(event.type)
      
    })
  }


  checkUpdate(){
    this.appRef.isStable.subscribe((isStable)=>{
      if(isStable){
        const timeInterval = interval(20000);
        timeInterval.subscribe(()=>{
          this.swUpdate.checkForUpdate().then(()=>console.log('checked'))
        });
      }
    })
  }

}
