import { User } from '../../models/User';
import { Product } from '../../models/Products';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  HomeTabs: undefined;
  UserDetail: {
    user: User;
  };
  ProductDetails: {
    product: Product;
  };
};
