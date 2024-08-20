import { Component,Input  } from '@angular/core';

@Component({
  selector: 'app-foto-empleado-modal',
  templateUrl: './foto-empleado-modal.component.html',
  styleUrls: ['./foto-empleado-modal.component.css']
})
export class FotoEmpleadoModalComponent {

  @Input() imageUrl: string = '';

  closeModal(): void {
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }

  openModal(): void {
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      modalElement.style.display = 'block';
    }
  }

}
