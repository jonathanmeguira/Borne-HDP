import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MailerService} from '../services/mailer.service';


@Component({
  selector: 'app-tuktuk',
  templateUrl: './tuktuk.component.html',
  styleUrls: ['./tuktuk.component.css'],
  providers: [MailerService]
})
export class TuktukComponent implements OnInit {
  openingHours: number[] = [];
  ticketId = false;
  numberOfTravelers: number;
  selectedHour: number;
  firstName: string;
  lastName: string;
  travelers: number[] = [];

  constructor(private router: Router, private mailer: MailerService) {
  }

  ngOnInit() {
    this.populateHoursArray();
    this.populateTravelers();
  }

  populateHoursArray = () => {
    for (let i = 9; i < 19; i++) {
      this.openingHours.push(i);
    }
  }
  populateTravelers = () => {
    for (let i = 1; i < 7; i++) {
      this.travelers.push(i);
    }
  }

  print() {
    this.router.navigate(['print'], {
      queryParams: {
        firstName: this.firstName,
        name: this.lastName,
        persons: this.numberOfTravelers
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  bookTuk = () => {
    this.ticketId = true;
    this.mailer.sendEmail(this.lastName, this.firstName, this.selectedHour, this.numberOfTravelers).subscribe((res) => {
      console.log(res);
    });
  }
}
