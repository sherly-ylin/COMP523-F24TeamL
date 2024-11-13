import { Injectable } from '@angular/core';


export interface Profile {
  id: number | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: number;
  // permissions: ;
}


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }
}
