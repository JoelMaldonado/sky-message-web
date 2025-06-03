import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-select-device',
  imports: [],
  templateUrl: './select-device.component.html',
})
export class SelectDeviceComponent {
  phones: string[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.listenAvailable().subscribe((data) => {
      this.phones.push(data.id);
    });

    this.socketService.getConnected().subscribe({
      next: (data: any) => {
        this.phones = data;
      },
    });
  }
}
