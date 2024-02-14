import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CotizacionesRoutingModule } from './cotizaciones-routing.module';
import { AsignarCotizacionComponent } from './asignar-cotizacion/asignar-cotizacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuscarCotizacionComponent } from './buscar-cotizacion/buscar-cotizacion.component';
import { AppComponent } from 'src/app/app.component';
import { EditarCotizacionComponent } from './editar-cotizacion/editar-cotizacion.component';
import { EliminarCotizacionComponent } from './eliminar-cotizacion/eliminar-cotizacion.component';







@NgModule({
  declarations: [
    AsignarCotizacionComponent,
    BuscarCotizacionComponent,
    EditarCotizacionComponent,
    EliminarCotizacionComponent,     
    ],
  imports: [
    CommonModule,
    CotizacionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  
  bootstrap: [AppComponent]
})
export class CotizacionesModule { }
