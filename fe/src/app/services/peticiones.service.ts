import { Injectable } from "@angular/core";
import { HttpModule, Http, Response, Headers } from "@angular/http";
import { GLOBAL } from './global';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CATCH_ERROR_VAR } from "@angular/compiler/src/output/abstract_emitter";

@Injectable()
export class PeticionesService {
  public url: string = GLOBAL.url;
  constructor(
    // private _httpClient: HttpClient,
    private _http: HttpClient
    

  ) {
    // this.url = "https://jsonplaceholder.typicode.com/users";
  }
  getCatEgresos() {
    return this._http.get(this.url + 'categoriaEgresos').map((res: Response) => res);
  }
  getEvents() {
    return this._http.get(this.url + 'events').map((res: Response) => res);
  }
  getEvent(id) {
    return this._http.get(this.url + 'events/' + id).map((res: Response) => res);
  }
  //prueba
  getEventInscriptions(id) {
    return this._http.get(this.url + 'events/inscriptions/' + id).map((res: Response) => res);
  }
  getTrimestral() {
    return this._http.get(this.url + 'events/trimestral').map((res: Response) => res);
  }
  addProgram(program) {
    let body = JSON.stringify(program);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'programs/add', body, { headers: headers }).map((res: Response) => res);
  }
  getPrograms() {

    return this._http.get(this.url + 'programs').map((res: Response) => res);
  }
  getProgram(_id) {
    return this._http.get(this.url + 'programs/' + _id).map((res: Response) => res);
  }
  addModulo(modulo) {
    let body = JSON.stringify(modulo);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'modules/add', body, { headers: headers }).map((res: Response) => res);
  }
  getModulos(idProgram) {
    // //console.log(idProgram)
    // console.log(idProgram)
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'modules/lista/' + idProgram, { headers: headers }).map((res: Response) => res);
  }
  getEventModuls(eventId) {
    // //console.log(eventId)
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'modules/eventoModuls/' + eventId, { headers: headers }).map((res: Response) => res);
  }
  getModulo(_id) {
    return this._http.get(this.url + 'modules/' + _id).map((res: Response) => res);
  }
  //    getIdProgram(nomProgram){
  //     let body = JSON.stringify(nomProgram);
  //      var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  //       return this._http.post(this.url + 'programs/id', body, { headers: headers }).map((res: Response) => res);
  //    }
  addEvent(event) {
    let body = JSON.stringify(event);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'events', body, { headers: headers }).map((res: Response) => res);
  }
  addPerson(person) {
    let body = JSON.stringify(person);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'persons', body, { headers: headers }).map((res: Response) => res);
  }
  addInscriptPerson(registro) {
    let body = JSON.stringify(registro);
    var id = registro.eventId;
    // //console.log(id);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'events/inscriptPerson/' + id, body, { headers: headers }).map((res: Response) => res);
  }
  addNivelacion(registro){
    let body = JSON.stringify(registro);
    var id = registro.eventId;
    // //console.log('id del evento Actual: '+id);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'events/nivelacion/' + id, body, { headers: headers }).map((res: Response) => res);
  }
  getPerson(_id) {
    return this._http.get(this.url + 'persons/' + _id).map((res: Response) => res);
  }
  getPersonProfile(_id) {
    return this._http.get(this.url + 'persons/programs/' + _id).map((res: Response) => res);
  }
  getPersonWorkshop(_id) {
    return this._http.get(this.url + 'persons/workshop/' + _id).map((res: Response) => res);
  }
  getCi(ci) {
    return this._http.get(this.url + 'persons/existCi/' + ci).map((res: Response) => res);
  }
  getCiAmount(ci) {
    return this._http.get(this.url + 'persons/existCiAmount/' + ci).map((res: Response) => res);
  }
  getPersonProgram(idPerson, idProfile) {
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    let body = JSON.stringify({ profileId: idProfile });
    return this._http.post(this.url + 'persons/profile/' + idPerson, body).map((res: Response) => res);
  }
  postPersonProgramDetails(idPerson, idProfile) {
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    let body = JSON.stringify({ profileId: idProfile });
    return this._http.post(this.url + 'persons/descriptionProfile/' + idPerson, body, { headers: headers }).map((res: Response) => res);
  }
  postRequirement(id,idProgram){
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    let body = JSON.stringify({ programId: idProgram });
    return this._http.post(this.url + 'events/requirements/'+id, body, { headers: headers }).map((res: Response) => res);    
  }
  updateProfilePerson(idPerson, idP, photo, ci, titulo){
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    let body = JSON.stringify({ profileId: idP , photo, ci, titulo});
    return this._http.put(this.url + 'persons/profile/'+idPerson, body, { headers: headers }).map((res: Response) => res);    
  }
  getPersons() {
    return this._http.get(this.url + 'persons').map((res: Response) => res);
  }
  getEventConfirmed(id) {
    return this._http.get(this.url + 'events/' + id).map((res: Response) => res);
  }
  getCarteras() {
    return this._http.get(this.url + 'carteras').map((res: Response) => res);
  }
  getCartera(_id) {
    return this._http.get(this.url + 'carteras/' + _id).map((res: Response) => res);
  }
  getCarterasLibres() {
    return this._http.get(this.url + 'carteras/libres').map((res: Response) => res);
  }
  crearCartera(cartera) {
    let body = JSON.stringify(cartera);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'carteras/guardar', body, { headers: headers }).map((res: Response) => res);
  }
  getFacilitadores() {
    return this._http.get(this.url + 'facilitators').map((res: Response) => res);
  }
  getFacilitador(id) {
    return this._http.get(this.url + 'facilitators/' + id).map((res: Response) => res);
  }
  addFacilitador(user) {
    let body = JSON.stringify(user);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'facilitators/register', body, { headers: headers }).map((res: Response) => res);
  }
  updateFacilitador(facilitador_object) {
      //console.log(facilitador_object, 'test');
    let body = JSON.stringify(facilitador_object);
    var idFacilitador = facilitador_object._id;
    //console.log(body);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.put(this.url + 'facilitators/edit/' + idFacilitador, body, { headers: headers }).map((res: Response) => res);
  }
  addUser(user) {
    let body = JSON.stringify(user);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'users/register', body, { headers: headers }).map((res: Response) => res);
  }
  getUser() {
    return this._http.get(this.url + 'users').map((res: Response) => res);
  }
  getOneUser(_id) {
    return this._http.get(this.url + 'users/' + _id).map((res: Response) => res);
  }
  deleteUser(_id) {

    return this._http.delete(this.url + 'users/' + _id).map((res: Response) => res);
  }
  getMejorEjecutivo(_id) {
    return this._http.get(this.url + 'events/mejorEjecutivo/' + _id).map((res: Response) => res);
  }

  updatePerson(event_object) {
    let body = JSON.stringify(event_object);
    var idPerson = event_object._id;
    //console.log(body);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.put(this.url + 'persons/' + idPerson, body, { headers: headers }).map((res: Response) => res);
  }
  //return this._http.post(this.url + 'events/edit',body,{headers : headers}).map((res:Response)=>res);
  //.catch(this.handleError);
  updatePersonOcupation(descOcupation, id) {
    let body = JSON.stringify(descOcupation);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.put(this.url + 'persons/ocupation/' + id, body, { headers: headers }).map((res: Response) => res);
  }
  getPersonCartera(_id) {

    //console.log(_id+"desde peticionesservice")
    return this._http.get(this.url + 'carteras/persons/' + _id).map((res: Response) => res);
    //  return this._http.get(this.url+'cartera/listPersonsCartera/'+_id).map((res: Response)=> res);

  }
  getCarteraFromUserId(id) {
    //console.log(body);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'carteras/otro/' + id, { headers: headers }).map((res: Response) => res);
  }


  // updateUsers (user: User): Observable<null> {
  //   return this.http.put(this.usersUrl, user, httpOptions).pipe(
  //     tap(_ => this.log(`updated user id=${user.id}`)),
  //     catchError(this.handleError<any>('updateUser'))
  //   );
  // }

  updateCartera(cartera_object) {
    // //console.log(cartera_object);
    let body = JSON.stringify(cartera_object);
    var idCartera = cartera_object._id;
    //console.log(body);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.put(this.url + 'carteras/' + idCartera, body, { headers: headers }).map((res: Response) => res);
  }
  addCartera(cartera) {
    let body = JSON.stringify(cartera);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'carteras/register', body, { headers: headers }).map((res: Response) => res);
  }
  getRole(id) {
    return this._http.get(this.url + 'users/rolName/' + id).map((res: Response) => res);
  }
  updateUser(user_object) {
    // //console.log(user_object);
    let body = JSON.stringify(user_object);
    var idUser = user_object._id;
    //console.log(body);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.put(this.url + 'users/' + idUser, body, { headers: headers }).map((res: Response) => res);
  }
  updateProgram(program_object) {
      //console.log(program_object, 'test');
    let body = JSON.stringify(program_object);
    var idProgram = program_object._id;
    //console.log(body);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.put(this.url + 'programs/edit/' + idProgram, body, { headers: headers }).map((res: Response) => res);
  }
  updateModulo(modulo_object) {
    // //console.log(modulo_object);
    let body = JSON.stringify(modulo_object);
    var idModulo = modulo_object._id;
    //console.log(body);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.put(this.url + 'modules/edit/' + idModulo, body, { headers: headers }).map((res: Response) => res);
  }
  getSucursales() {
    return this._http.get(this.url + 'offices').map((res: Response) => res);
  }
  addCorrelative(correlative) {
    let body = JSON.stringify(correlative);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'correlatives/add', body, { headers: headers }).map((res: Response) => res);
  }
  getSucursal(id) {

    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'offices/' + id, { headers: headers }).map((res: Response) => res);
  }
  getCorrelativos(){
    return this._http.get(this.url + 'correlatives').map((res: Response) => res);
    
  }
  getRoles() {
    return this._http.get(this.url + 'roles').map((res: Response) => res);
  }

  addCashFlowUserIngreso(ingreso) {
    //console.log(ingreso);
    let body = JSON.stringify(ingreso);
    //console.log(body);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'cajaUsuario/ingreso', body, { headers: headers }).map((res: Response) => res);
  }

  addCashFlowUserEgreso(egreso) {
    //console.log(egreso);
    let body = JSON.stringify(egreso);
    //console.log(body);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'cajaUsuario/egreso', body, { headers: headers }).map((res: Response) => res);
  }

  getCashFlowUser(id) {

    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'cajaUsuario/' + id, { headers: headers }).map((res: Response) => res);


  }
  getCashFlowUserByUser(id) {

    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'cajaUsuario/ByUser/' + id, { headers: headers }).map((res: Response) => res);


  }
  getCashFlowUsers() {
    return this._http.get(this.url + 'cajaUsuario').map((res: Response) => res);
  }
  getCashFlowUsersPending(idUser) {
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'cajaUsuario/pending/' + idUser, { headers: headers }).map((res: Response) => res);

    }


  closeCashFlowUser(id) {

    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'cajaUsuario/close/' + id, { headers: headers }).map((res: Response) => res);

  }
  confirmCashFlowUser(id) {
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'cajaUsuario/confirm/' + id, { headers: headers }).map((res: Response) => res);

  }

  addDetailCashFlowOffice(detail) {

    //console.log(egreso);
    let body = JSON.stringify(detail);
    //console.log(body);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'cajaSucursal/addDetail', body, { headers: headers }).map((res: Response) => res);

  }

  getCurrentCashFlowOffice(id) {
    //console.log(id);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'cajaSucursal/current/' + id, { headers: headers }).map((res: Response) => res);


  }
  setAmountDeliveredCashFlowUser(cash) {

    let body = JSON.stringify(cash);
    //console.log(body);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'cajaUsuario/setAmountDelivered', body, { headers: headers }).map((res: Response) => res);

  }
  getCashFlowOffices() {
    return this._http.get(this.url + 'cajaSucursal/allActive').map((res: Response) => res);
  }

  closeCashFlowUserFromManager(id) {

    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'cajaUsuario/closeFromManager/' + id, { headers: headers }).map((res: Response) => res);

  }
  closeCashFlowOffice(cashFlowOffice) {

    let body = JSON.stringify(cashFlowOffice);
    //console.log(body);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'cajaSucursal/close', body, { headers: headers }).map((res: Response) => res);




    // var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    // return this._http.get(this.url + 'cajaSucursal/close/' + id, { headers: headers }).map((res: Response) => res);

  }
  addNewCashFlowOffice(idUser) {
    let body=JSON.stringify(idUser)
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'cajaSucursal/new/' , body, { headers: headers }).map((res: Response) => res);
  }
  ///////////////////////////////////////////////////////////////////////////7
  addAssitance(lists) {
    let body = JSON.stringify(lists);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'lists', body, { headers: headers }).map((res: Response) => res);
  }
  getList(id) {
    return this._http.get(this.url + 'lists/person/' + id).map((res: Response) => res);
  }
  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = this.url + 'persons/upload';
    // const endpoint = this.url + 'importFromExcel/upload';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    let headers = new HttpHeaders();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    // let options = new RequestOptions({ headers: headers });
    return this._http
      .post(endpoint, formData, { headers: headers })
      .map(() => { return true; })
    // .catch((e) => Observable.throw(e))
    // .subscribe();
  }

  marcarAsistencia(ObjId){

    let body = JSON.stringify(ObjId);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'modulars/asistencia', body, { headers: headers }).map((res: Response) => res);
 
  }
  getAsistenciaOfPerson(ObjId){

    let body = JSON.stringify(ObjId);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'modulars/getAsistencia', body, { headers: headers }).map((res: Response) => res);
  
  }
  addFinalWork(personId, final) {
    let body = JSON.stringify(final);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.put(this.url + 'persons/finalWork/' + personId, body, { headers: headers }).map((res: Response) => res);
  
  }
  addReview(personId, rev) {
    let body = JSON.stringify(rev);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.put(this.url + 'persons/review/' + personId, body, { headers: headers }).map((res: Response) => res);
  
  }
  markPrintCertificate(ObjId){
    let body = JSON.stringify(ObjId);
    // //console.log(body)
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'modulars/printCertificate', body, { headers: headers }).map((res: Response) => res);
  
  }
  getInscriptionPerson(_id){		
      return this._http.get(this.url + 'persons/inscriptionPerson/' + _id).map((res: Response) => res);		
    }		
  addControlPago(registro){		
     let body = JSON.stringify(registro);		
     var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');		
     return this._http.post(this.url + 'persons/controlPago/', body, { headers: headers }).map((res: Response) => res);		
   }

   confirmCajaSucursal(idCajaSucursal){
    let body = JSON.stringify(idCajaSucursal);	
    // //console.log(body);	
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');		
    return this._http.post(this.url + 'cajaSucursal/confirm/', body, { headers: headers }).map((res: Response) => res);		



   }
   getOfficeFromUser(_id){		
    return this._http.get(this.url + 'offices/officeFromUser/' + _id).map((res: Response) => res);		
  }	

  addDetailToPrincipal(detail){
    let body = JSON.stringify(detail);	
    // //console.log(body);
    // //console.log('desde peticiones');	
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');		
    return this._http.post(this.url + 'cajaPrincipal/addDetail/', body, { headers: headers }).map((res: Response) => res);		


  }
  getPrincipalCash(_id){	
    let body = JSON.stringify(_id);	
    // //console.log(body);
    // //console.log('desde peticiones');	
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');		
    return this._http.post(this.url + 'cajaPrincipal/getPrincipal/', body, { headers: headers }).map((res: Response) => res);		
	
    // return this._http.get(this.url + 'cajaPrincipal/getPrincipal/' + _id).map((res: Response) => res);		
  }	
  getModulars(eventId) {
    // //console.log(eventId)
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'events/getModulars/' + eventId, { headers: headers }).map((res: Response) => res);
  }
  postModules(modules){		
    let body = JSON.stringify(modules);		
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');		
    return this._http.post(this.url + 'modules/modules/', body, { headers: headers }).map((res: Response) => res);		
  }

  getAcconutsModulars(modular_id){
    // //console.log(modular_id)
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'modulars/accountModulars/' + modular_id, { headers: headers }).map((res: Response) => res);
  }

  getEjecutivoToEdit(ejecutivoId){
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'users/getEjecutivoToEdit/' + ejecutivoId, { headers: headers }).map((res: Response) => res);

  }


  reasignarCartera(ObjId){

    let body = JSON.stringify(ObjId);	
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');		
    return this._http.post(this.url + 'carteras/reasignarCartera/', body, { headers: headers }).map((res: Response) => res);		
	
  }
  reporteEvento(fechas){
    let body = JSON.stringify( fechas);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');		
    return this._http.post(this.url + 'events/reporteEvento/', body, { headers: headers }).map((res: Response) => res);
  }
  correlativeDate(date){
    let body = JSON.stringify(date);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');		
    return this._http.post(this.url + 'correlatives/fechas/', body, { headers: headers }).map((res: Response) => res);
  }
  addNewTaller(taller){
    let body = JSON.stringify(taller);	
    // //console.log(body);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');		
    return this._http.post(this.url + 'events/addNewTaller/', body, { headers: headers }).map((res: Response) => res);		
  }

  // getEventTallerInscriptions(event){
  //   let body = JSON.stringify(event);	
    //console.log(body);
  //   var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');		
  //   return this._http.post(this.url + 'events/getEventTallerInscriptions/', body, { headers: headers }).map((res: Response) => res);		
	


  // }



  getEventTallerInscriptions(id) {
    return this._http.get(this.url + 'events/getEventTallerInscriptions/' + id).map((res: Response) => res);
  }

  getEvetnModuleTallerInscriptions(moduleTaller){
    let body = JSON.stringify(moduleTaller);	
    // //console.log(body);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');		
    return this._http.post(this.url + 'events/getEvetnModuleTallerInscriptions/', body, { headers: headers }).map((res: Response) => res);		
	

  }
  cerrarEvento(id){
    return this._http.get(this.url + 'events/cerrarEvento/' + id).map((res: Response) => res);
    
  }
  getEventsActiveOfSucursal(id){
    return this._http.get(this.url + 'events/getEventsActiveOfSucursal/' + id).map((res: Response) => res);
    
  }
  listPersonNivelacionForCalls(obj){
    let body = JSON.stringify(obj);	
    // //console.log(body);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');		
    return this._http.post(this.url + 'events/listPersonNivelacionForCalls/', body, { headers: headers }).map((res: Response) => res);		
  }


}
