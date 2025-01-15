import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, JsonHubProtocol, LogLevel } from '@microsoft/signalr'
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack'
import { dataModel } from '../../dataModel';

interface chatMesage {
  Text: string;
  ConnectionId: string;
  DateTime: Date;
}

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection?: HubConnection;
  private connectionUrl = 'https://localhost:7207';
  //private connectionUrl = 'https://janadamski.ddns.net:2006/relaybot';

  constructor(private http: HttpClient) { }

  public botdata?: dataModel;
  public liveData: Boolean = false;
  public connect = () => {
    this.startConnection();
    this.addListeners();
  }

  public changeBot(botId: number) {
    //this.sendMessageToHub("changeBot " + botId).subscribe();
    this.hubConnection?.send("changeBot", botId.toString())
      .then(() => { console.log('bot changed successfully'); })
      .catch((err) => console.log('error while changing bot: ' + err));
    this.http.get<dataModel>(`${this.connectionUrl}/latest/${botId}`).subscribe(data => {
      this.botdata = data;
    });
  }

  // public sendMessageToApi(message: string) {
  //   return this.http.post(this.apiUrl, this.buildChatMessage(message))
  //     .pipe(tap(_ => console.log("message sucessfully sent to api controller")));
  // }

  // public sendMessageToHub(message: string) {
  //   var promise = this.hubConnection!.invoke("BroadcastAsync", this.buildChatMessage(message))
  //     .then(() => { console.log('message sent successfully to hub'); })
  //     .catch((err) => console.log('error while sending a message to hub: ' + err));

  //   return from(promise);
  // }

  private getConnection(): HubConnection {
    return new HubConnectionBuilder()
      .withUrl(`${this.connectionUrl}/signalr`)
      // .withHubProtocol(new JsonHubProtocol())
      // .configureLogging(LogLevel.Debug)
      .build();
  }

  // private buildChatMessage(message: string): chatMesage {
  //   return {
  //     ConnectionId: this.hubConnection!.connectionId!,
  //     Text: message,
  //     DateTime: new Date()
  //   };
  // }

  private startConnection() {
    this.hubConnection = this.getConnection();

    this.hubConnection.start()
      .then(() => console.log('connection started'))
      .catch((err) => console.log('error while establishing signalr connection: ' + err))
  }

  private addListeners() {
    // this.hubConnection.on("messageReceivedFromApi", (data: chatMesage) => {
    //   console.log("message received from API Controller")
    //   this.messages.push(data);
    // })
    this.hubConnection!.on("newData", (data: dataModel) => {
      //console.log("data received from Hub")
      this.liveData = true;
      this.botdata = data;
    })
  }
}
