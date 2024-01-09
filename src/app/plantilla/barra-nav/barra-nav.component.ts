import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, fromEvent, timer } from 'rxjs';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { debounceTime, take } from 'rxjs/operators';

@Component({
  selector: 'app-barra-nav',
  templateUrl: './barra-nav.component.html',
  styleUrls: ['./barra-nav.component.css']
})
export class BarraNavComponent implements OnInit, OnDestroy {
  seInicioSesion: boolean = false;
  RolAdmin: boolean = false;

  subs: Subscription = new Subscription();
  inactividadSubscription: Subscription = new Subscription();

  constructor(private seguridadServicio: SeguridadService, private router: Router){}

  ngOnInit(): void {
    this.subs = this.seguridadServicio.ObtenerDatosUsuarioEnSesion().subscribe((datos: ModeloIdentificar) =>{
      this.seInicioSesion = datos.estaIdentificado;
      this.validarAdministrador();  
      this.iniciarTemporizadorInactividad();   
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.inactividadSubscription.unsubscribe();
  }

  validarAdministrador(): void {
    const cargoEnSesion = this.seguridadServicio.datosUsuarioEnSesion.value.datos?.cargo;
    console.log("Cargo en sesion: " + cargoEnSesion);
    if(cargoEnSesion === 'Administrador'){
      this.RolAdmin = true;
    }
  }

  iniciarTemporizadorInactividad(): void {
    const tiempoMaximoInactivo = 5 * 60 * 1000; // 5 minutos en milisegundos

    const resetTimer = (): void => {
      this.inactividadSubscription.unsubscribe();
      this.inactividadSubscription = timer(tiempoMaximoInactivo).pipe(
        take(1)
      ).subscribe(() => this.logoutUser());
    };

    const mouseMove$ = fromEvent(document, 'mousemove');
    const keyPress$ = fromEvent(document, 'keypress');

    this.inactividadSubscription = mouseMove$.pipe(
      debounceTime(1000) // Cambia este valor según tus necesidades (milisegundos)
    ).subscribe(() => resetTimer());

    keyPress$.pipe(
      debounceTime(1000) // Cambia este valor según tus necesidades (milisegundos)
    ).subscribe(() => resetTimer());

    resetTimer();
  }

  logoutUser(): void {
    this.seguridadServicio.EliminarInformacionSesion();
    this.router.navigate(['./']);
    console.log("Usuario inactivo durante 5 minutos. Cerrando sesión...");
  }
}
