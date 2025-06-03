import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private readonly url = `${environment.baseUrl}/common/validate-contacts`;
  private readonly http = inject(HttpClient);

  validateContacts(contacts: any[]) {
    return this.http.post(this.url, contacts);
  }
}
