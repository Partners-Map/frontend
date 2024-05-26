import { TAdminFunctionalityPage } from '../../@types/admin';
import { RoutesList } from '../../routers';

export const AdminFunctionalityPages: TAdminFunctionalityPage[] = [
  {
    title: 'Заведения',
    path: RoutesList.PlacesPage
  },
  {
    title: 'Категории',
    path: RoutesList.СategoriesPage
  }
];
