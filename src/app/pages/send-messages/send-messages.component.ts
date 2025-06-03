import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { CommonService } from '../../services/common.service';
import { SelectDeviceComponent } from '../../components/select-device/select-device.component';

@Component({
  selector: 'app-send-messages',
  imports: [CommonModule, SelectDeviceComponent],
  templateUrl: './send-messages.component.html',
})
export class SendMessagesComponent {
  private readonly commonService = inject(CommonService);

  validContacts: any[] = [];
  invalidContacts: any[] = [];

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const raw = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // raw es una matriz de filas
      const jsonData: any[] = [];

      for (let i = 1; i < raw.length; i++) {
        const row: any = raw[i];
        const name = row[0]?.toString().trim();
        const telf = row[1]?.toString().trim();
        if (name && telf) {
          jsonData.push({ index: i, name, telf });
        }
      }

      this.validateContacts(jsonData);
    };

    reader.readAsArrayBuffer(file);
  }

  validateContacts(contacts: any[]) {
    this.commonService.validateContacts(contacts).subscribe({
      next: (res: any) => {
        this.validContacts = res.data?.validos || [];
        this.invalidContacts = res.data?.invalidos || [];
      },
      error: (err) => {
        console.log('Error al validar contactos:', err);
      },
    });
  }
}
