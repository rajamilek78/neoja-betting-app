import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS, AppConstant } from '../../helpers/constants';
import { environment } from '@env/environment';
import { APIManager } from "./api-manager.service";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // token = localStorage.getItem('token');
  private baseurl = environment.apiUrl;

  // remove http from here and use apiManager service, similar to login
  constructor(private http: HttpClient,
    private apiManager: APIManager) {
  }

  addPlayers(params:any){
    return this.apiManager.postApis(`${API_ENDPOINTS.PLAYER_ADD}`,params, true)
  }
  editPlayer(path : string,params:any){
    return this.apiManager.putApis(`${API_ENDPOINTS.PLAYER_EDit}/${path}`,params, true)
  }
  deletePlayer(path : string){
    return this.apiManager.deleteApis(`${API_ENDPOINTS.PLAYER_EDit}/${path}`, true)
  }

  addGame(params:any){
    return this.apiManager.postApis(`${API_ENDPOINTS.GAME_ADD}`,params, true)
  }

  getAllPlayer(): Observable<any> {
    return this.apiManager.getApis(API_ENDPOINTS.PLAYER_ALL, {}, true)
  }

  getTopPlayers(): Observable<any> {
    return this.apiManager.getApis(API_ENDPOINTS.PLAYER_TOP, {}, true)
  }

  resetDatabase(){
    return this.apiManager.postApis(`${API_ENDPOINTS.RESET_DATABASE}`,{}, true)
  }

  getGameRules(): Observable<any> {
    return this.apiManager.getApis(API_ENDPOINTS.GET_GAME_RULES, {}, true)
  }

  upsertGameRule(params:any){
    return this.apiManager.postApis(`${API_ENDPOINTS.UPSERT_GAME_RULE}`,params, true)
  }


}
