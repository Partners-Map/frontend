import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TPlaceWithFullInfo } from '../../@types/models/place';
import {
  useGetPlacesWithCategoriesQuery,
  useGetPlacesWithFullInfoQuery
} from '../../__data__/services/place';
import { clearEditPlace } from '../../__data__/slices/edit-place';
import { clearNewPlace } from '../../__data__/slices/new-place';
import { CategoryAlertDialog } from '../../components/category-alert-dialog';
import { Filters } from '../../components/filters';
import { Header } from '../../components/header';
import { OptionsDialog, OptionsDialogVariants } from '../../components/options-dialog';
import { PlacesList } from '../../components/places-list';
import { PlaceSteps } from '../../configs/place';
import { useFilter } from '../../hooks/filter';
import { RoutesList } from '../../routers';
import { ButtonContainerS, PageContainerS } from '../../styles/pages';

export const PlacesPage: FunctionComponent = () => {
  const { data: placesWithFullInfo, refetch: updatedPlacesList } = useGetPlacesWithFullInfoQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState<TPlaceWithFullInfo[]>([] || placesWithFullInfo);
  const { data: placesWithCategories } = useGetPlacesWithCategoriesQuery();
  const { filterDataByCategory, filterDataByPriceRange } = useFilter();
  const [searchParams] = useSearchParams();
  const priceRange = searchParams.get('priceRange');
  const category = searchParams.get('category');
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState<OptionsDialogVariants | ''>('');
  const [selectedPlace, setSelectedСategory] = useState<string>('');

  useEffect(() => {
    if (placesWithFullInfo && placesWithCategories) {
      let filteredDataTemp = [...placesWithFullInfo];

      if (priceRange) {
        filteredDataTemp = filterDataByPriceRange(filteredDataTemp, priceRange);
      }

      if (category) {
        filteredDataTemp = filterDataByCategory(filteredDataTemp, placesWithCategories, category);
      }

      setFilteredData(filteredDataTemp);
    }
  }, [placesWithFullInfo, priceRange, category, placesWithCategories]);

  const goToNewPlace = (): void => {
    navigate(RoutesList.NewPlace + 'SelectPartner');
  };

  const goBack = (): void => {
    navigate(RoutesList.AdminHub);
  };

  const handleClickOpenDialog = (id: string): void => {
    setOpenDialog(true);
    setSelectedСategory(id);
  };

  const handlerDeleteCategory = (): void => {
    setOpenAlertDialog(true);
  };

  const handleCloseAlertDialog = (): void => {
    setOpenAlertDialog(false);
    updatedPlacesList();
  };

  const handleCloseOptionsDialog = (value: OptionsDialogVariants | ''): void => {
    setOpenDialog(false);
    setSelectedValue(value);
    if (value === 'delete') {
      handlerDeleteCategory();
      return;
    }
    if (value === 'edit') {
      navigate(`${RoutesList.EditPlace + selectedPlace}/${Object.keys(PlaceSteps)[0]}`);
    }
  };

  // TODO донастройка eslint
  useEffect(() => {
    dispatch(clearNewPlace());
    dispatch(clearEditPlace());
    updatedPlacesList();
  }, []);

  return (
    <PageContainerS>
      <Header isAdmin />
      <Button
        variant='contained'
        sx={{
          marginTop: '2vh'
        }}
        onClick={goBack}
      >
        <ChevronLeftIcon />
      </Button>
      {/* TODO добавить в общую фильтрацию, поиск */}
      {/* <Search
        style={{
          margin: '4vh 0 0 0',
          width: '100%'
        }}
      /> */}
      <Filters haveCategory />
      {filteredData && (
        <PlacesList
          isAdmin
          data={filteredData}
          style={{ maxHeight: '64vh' }}
          onClick={handleClickOpenDialog}
        />
      )}
      <ButtonContainerS>
        <Button onClick={goToNewPlace} variant='contained'>
          Добавить новое место
        </Button>
      </ButtonContainerS>
      <OptionsDialog
        selectedValue={selectedValue}
        open={openDialog}
        onClose={handleCloseOptionsDialog}
      />
      <CategoryAlertDialog
        open={openAlertDialog}
        onClose={handleCloseAlertDialog}
        id={selectedPlace}
        isPlace
      />
    </PageContainerS>
  );
};
