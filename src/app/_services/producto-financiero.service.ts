import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductoFinanciero } from '../_model/producto-financiero.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoFinancieroService {

  private URL = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<ProductoFinanciero[]>{
    return this.http.get<ProductoFinanciero[]>(this.URL);
  }

  agregarProducto(productoFinancieroArg: ProductoFinanciero): Observable<ProductoFinanciero>{
    return this.http.post<ProductoFinanciero>(this.URL, productoFinancieroArg);
  }

  modificarProducto(productoFinancieroArg: ProductoFinanciero): Observable<any>{
    return this.http.put<any>(this.URL, productoFinancieroArg);
  }

  eliminarProducto(id: string): Observable<string>{
    let params = new HttpParams();
    params = params.set('id', id);
    return this.http.delete<string>(this.URL, {params});
  }

  buscarPorId(id: string): Observable<ProductoFinanciero[]>{
    let params = new HttpParams();
    params = params.set('id', id);
    return this.http.get<ProductoFinanciero[]>(`${this.URL}`, {params});
  }

  verificarExistencia(id: string): Observable<boolean>{
    let params = new HttpParams();
    params = params.set('id', id);
    return this.http.get<boolean>(`${this.URL}/verification`, {params});
  }








}
