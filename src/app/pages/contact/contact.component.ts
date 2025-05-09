import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  onSubmit(form: any): void {
    if (form.valid) {
      const data = form.value
      console.log('Formulaire soumis avec succès:', data);
      alert(`Merci ${data.nom} ! Nous avons bien reçu votre message.`);
      form.reset();
    } else {
      console.warn('Le formulaire est invalide.');
    }
  }
}
