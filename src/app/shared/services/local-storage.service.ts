import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setValue(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  getValue(key: string): any {
    return localStorage.getItem(key);
  }

  removeValue(key: string): void {
    localStorage.removeItem(key);
  }
}
