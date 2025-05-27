import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  // Fonction utilitaire pour vérifier les champs avec uniquement des espaces
  hasOnlySpaces(value: string): boolean {
    return value !== undefined && value.trim().length === 0;
  }

  // Fonction appelée à la soumission du formulaire
  onSubmit(form: any): void {
    const messageValue = form.controls.message?.value;

    // Si le message est vide ou contient uniquement des espaces
    if (this.hasOnlySpaces(messageValue)) {
      alert('Le message ne peut pas être vide ou ne contenir que des espaces.');
      return;
    }

    // Si le formulaire est valide
    if (form.valid) {
      const data = form.value;
      console.log('Formulaire soumis avec succès:', data);
      alert(`Merci ${data.nom} ! Nous avons bien reçu votre message.`);
      form.reset();
    } else {
      console.warn('Le formulaire est invalide.');
    }
  }
}
