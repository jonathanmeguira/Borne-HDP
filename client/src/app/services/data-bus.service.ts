import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ProductModel} from '../Models/product';

@Injectable()
export class DataBusService {
  private _language: BehaviorSubject<string>;
  private _selectedProduct: BehaviorSubject<ProductModel>;
  private _dataIsLoading: BehaviorSubject<boolean>;
  private _cartQuantity: BehaviorSubject<number>;

  constructor() {
    this._language = new BehaviorSubject<string>('en');
    this._selectedProduct = new BehaviorSubject<ProductModel>(new ProductModel());
    this._dataIsLoading = new BehaviorSubject<boolean>(false);
    this._cartQuantity = new BehaviorSubject<number>(0);
  }

  setNewProduct(product: ProductModel) {
    this._selectedProduct.next(product);
    window.localStorage.setItem('currentProductUrl', product.url);
  }

  get currentProduct() {
    return this._selectedProduct.asObservable();
  }

  setDataLoadingStatus(status: boolean) {
    this._dataIsLoading.next(status);
  }

  get dataLoadingStatus() {
    return this._dataIsLoading.asObservable();
  }

  updateCartQuantity(value: number) {
    console.log('new value ', value);
    this._cartQuantity.next(value);
  }

  get cartQuantity() {
    return this._cartQuantity.asObservable();
  }

  setLanguage(lang: string) {
    this._language.next(lang);
  }

  get language() {
    return this._language.asObservable();
  }
}
