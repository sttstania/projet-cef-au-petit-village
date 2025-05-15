export class FigurineModel {
  'id': number;
  'name': string;
  'description': string;
  'price': number;
  "imageUrl": string;
  "inStock": boolean;

  constructor(init?: Partial<FigurineModel>) {
    Object.assign(this, init);
  }
}
