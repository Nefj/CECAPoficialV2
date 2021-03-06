import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import components
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { ListInscriptionsComponent } from './list-inscriptions/list-inscriptions.component';
import { ListRequirementsComponent } from './list-requirements/list-requirements.component';
import { AccountsReceivableComponent } from './accounts-receivable/accounts-receivable.component';
import { EventComponent } from './event/event.component';
import { ProfilePersonComponent } from './event/profile-person/profile-person.component';
import { AddFinalWorkComponent } from './event/profile-person/add-final-work/add-final-work.component';
import { AddReviewComponent } from './event/profile-person/add-review/add-review.component';
import { PrintCertificateComponent } from './event/profile-person/print-certificate/print-certificate.component';
import { DetailsComponent } from './event/profile-person/details/details.component';
import { ReportsComponent } from './graphicReports/reports/reports.component';
import { ReportTrimestralComponent } from './graphicReports/report-trimestral/report-trimestral.component';
import { ReportEventComponent } from './graphicReports/report-event/report-event.component';
import { CarteraComponent } from "./cartera/cartera.component";
import { AddCarteraComponent } from './cartera/add-cartera/add-cartera.component';
import { InfoCarteraComponent } from "./cartera/info-cartera/info-cartera.component";
import { EditCarteraComponent } from "./cartera/edit-cartera/edit-cartera.component";
import { EjecutivoComponent } from "./ejecutivo/ejecutivo.component";
import { EditEjecutivoComponent } from './ejecutivo/edit-ejecutivo/edit-ejecutivo.component';
import { PersonaComponent } from "./event/persona/persona.component";
import { AddPersonComponent } from './event/persona/addPerson/addPerson.component';
import { EditComponent } from "./event/persona/edit/edit.component";
import { SucursalComponent } from './sucursal/sucursal.component';
import { AddSucursalComponent } from './sucursal/addSucursal/addsucursal.component';
import { HeroFormComponent } from "./hero-form/hero-form.component";
import { DetalleCajaComponent } from './sucursal/detalle-caja/detalle-caja.component';
import { DetallePersonalComponent } from './sucursal/detalle-personal/detalle-personal.component';
import { AddEjecutivoComponent } from "./ejecutivo/add-ejecutivo/add-ejecutivo.component";

import { Programa } from './modelo/programa';
import { ProgramaComponent } from './programa/programa.component';
import { EditProgramaComponent } from './programa/edit-programa/edit-programa.component';
import { AddProgramaComponent } from './programa/add-programa/add-programa.component';
import { ModuloComponent } from './modulo/modulo.component';
import { EditModuloComponent } from './modulo/edit-modulo/edit-modulo.component';
import { AddModuloComponent } from './modulo/add-modulo/add-modulo.component';

import { InfoEjecutivoComponent } from "./ejecutivo/info-ejecutivo/info-ejecutivo.component";
import { VistaCajaComponent } from "./caja/vista-caja/vista-caja.component";

import { IngresoComponent } from "./caja/ingreso/ingreso.component";
import { EgresoComponent } from './caja/egreso/egreso.component';
import { facilitadorComponent } from './facilitador/facilitador.component';
import { AddFacilitadorComponent } from './facilitador/add-facilitador/add-facilitador.component';
import { EditFacilitadorComponent } from './facilitador/edit-facilitador/edit-facilitador.component';
import { AddCorrelativeComponent } from './correlative/add-correlative/add-correlative.component';
import { AddEventComponent } from './events/addEvent/addEvent.component';
import { PendingCashComponent } from "./pending-cash/pending-cash.component";
import { ControlAsistanceComponent } from './event/control-asistance/control-asistance.component';

import { InfoPendingCashComponent } from "./pending-cash/info-pending-cash/info-pending-cash.component";
import { OfficesCashComponent } from "./offices-cash/offices-cash.component";
//import { AlertComponent } from './events/alert/alert.component';
import { AsistenciaComponent } from './event/asistencia/asistencia.component';
import { InscriptionComponent } from './event/inscription/inscription.component';
import { ControlPagoComponent } from './event/control-pago/control-pago.component';
import { AccountsModularsComponent } from './accounts-modulars/accounts-modulars.component';
import { ImportFromExcelComponent } from './import-from-excel/import-from-excel.component';
import { SendToPrincipalComponent } from "./pending-cash/send-to-principal/send-to-principal.component";
import { PrincipalCashComponent } from "./principal-cash/principal-cash.component";
import { ReporteEventosComponent } from './reporte-eventos/reporte-eventos.component';
import { RepEventComponent } from './reporte-eventos/rep-event/rep-event.component';

import { InscriptionWorkshopComponent } from "./event/inscription-workshop/inscription-workshop.component";
import { NivelacionComponent } from './event/nivelacion/nivelacion.component';

import { WorkshopComponent } from "./workshop/workshop.component";
import { PrintBatchCertificatesComponent } from "./event/print-batch-certificates/print-batch-certificates.component";
import { ListaPesonsNivelacionComponent } from "./lista-pesons-nivelacion/lista-pesons-nivelacion.component";
import { PermisosVistaComponent } from "./permisos-vista/permisos-vista.component";
import { CorrelativeComponent } from './correlative/correlative.component';
import { AlertBackupComponent } from './home/alert-backup/alert-backup.component';
import { BackupComponent } from './home/backup/backup.component';

import { AuthGuard } from "./auth.guard";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },//ruta basica
    { path: 'login', component: LoginComponent },
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: 'home', redirectTo: 'home', pathMatch: 'full' },
            //  { path: 'events', component: EventsComponent,canActivate:[AuthGuard], },
            { path: 'events', component: EventsComponent, },

            //{ path: 'events/alert', component: AlertComponent },
            { path: 'events/add', component: AddEventComponent },
            { path: 'listPrint/:id', component: ListInscriptionsComponent },
            { path: 'listRequeriments/:id', component: ListRequirementsComponent },
            { path: 'accountsReceivable/:id', component: AccountsReceivableComponent },
            { path: 'event/:id', component: EventComponent },
            { path: 'event/asistencia/:id', component: AsistenciaComponent },
            { path: 'profilePerson/:id', component: ProfilePersonComponent },
            { path: 'finalWork/add/:id', component: AddFinalWorkComponent },
            { path: 'review/add/:id', component: AddReviewComponent },
            { path: 'printCertificate/:id', component: PrintCertificateComponent },
            { path: 'detailsProfile/:id', component: DetailsComponent },
            { path: 'reports', component: ReportsComponent },
            { path: 'trimestral', component: ReportTrimestralComponent },
            { path: 'reportEvent/:id', component: ReportEventComponent },
            { path: 'persons', component: PersonaComponent },
            { path: 'persons/add', component: AddPersonComponent },
            { path: 'persons/edit/:id', component: EditComponent },
            { path: 'persons/asistencia/:id', component: AsistenciaComponent },
            { path: 'cartera', component: CarteraComponent },
            { path: 'cartera/add', component: AddCarteraComponent, canActivate: [AuthGuard] },///////////authGuard
            { path: 'cartera/:id', component: InfoCarteraComponent },
            { path: 'cartera/edit/:name', component: EditCarteraComponent, canActivate: [AuthGuard] },///////////authGuard
            { path: 'ejecutivo', component: EjecutivoComponent },
            { path: 'ejecutivo/add', component: AddEjecutivoComponent, canActivate: [AuthGuard] },///////////authGuard
            { path: 'ejecutivo/:id', component: InfoEjecutivoComponent },
            { path: 'ejecutivo/edit/:active', component: EditEjecutivoComponent, canActivate: [AuthGuard] },///////////authGuard
            { path: 'sucursal', component: SucursalComponent },
            { path: 'sucursal/add', component: AddSucursalComponent, canActivate: [AuthGuard] },///////////authGuard
            { path: 'sucursal/detalleCaja', component: DetalleCajaComponent },
            { path: 'sucursal/detalleCaja/:id', component: DetalleCajaComponent },
            { path: 'sucursal/personal', component: DetallePersonalComponent },
            { path: 'formulariobase', component: HeroFormComponent },
            { path: 'programs', component: ProgramaComponent },
            { path: 'program/edit/:id', component: EditProgramaComponent },
            { path: 'program/add', component: AddProgramaComponent },
            { path: 'modulos/:id', component: ModuloComponent },
            { path: 'modulo/edit/:id', component: EditModuloComponent },
            { path: 'modulo/add/:id', component: AddModuloComponent },
            { path: 'caja/vistacaja', component: VistaCajaComponent },
            { path: 'caja/ingreso', component: IngresoComponent },
            { path: 'caja/egreso', component: EgresoComponent },
            { path: 'facilitador', component: facilitadorComponent },
            { path: 'facilitador/add', component: AddFacilitadorComponent },
            { path: 'facilitador/edit/:id', component: EditFacilitadorComponent },
            { path: 'correlative/add', component: AddCorrelativeComponent },
            { path: 'pendientes', component: PendingCashComponent },
            { path: 'pendientes/info/:id', component: InfoPendingCashComponent },
            { path: 'officesCash', component: OfficesCashComponent },
            { path: 'inscription/:id', component: InscriptionComponent },
            { path: 'nivelacion/:id', component: NivelacionComponent },
            { path: 'event/controPago/:id', component: ControlPagoComponent },
            { path: 'accountsModulars/:id', component: AccountsModularsComponent },
            { path: 'importFromExcel', component: ImportFromExcelComponent },
            { path: 'sucursal/sendToPrincipal', component: SendToPrincipalComponent },
            { path: 'cajaPrincipal', component: PrincipalCashComponent, canActivate: [AuthGuard] },///////////authGuard
            { path: 'reporteEvento', component: ReporteEventosComponent },
            { path: 'repEvent/:id', component: RepEventComponent },
            { path: 'workshop/:id', component: InscriptionWorkshopComponent },
            { path: 'workshopListP/:id', component: WorkshopComponent },
            { path: 'imprimirLoteCertificados/:id', component: PrintBatchCertificatesComponent },
            { path: 'listaParaNivelar/:id', component: ListaPesonsNivelacionComponent },
            { path: 'error', component: PermisosVistaComponent },
            { path: 'correlative', component: CorrelativeComponent },
            { path: 'backupAlert',component: AlertBackupComponent,  outlet: 'modal'},
            { path: 'backup',component: BackupComponent}
        ]
    },

    //{path: '', component: LoginFormComponent}
    { path: '**', component: HomeComponent }//ruta redir

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);