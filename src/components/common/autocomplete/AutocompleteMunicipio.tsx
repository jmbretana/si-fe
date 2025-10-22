import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "../theme/getSignUpTheme";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { GetTowns } from "@actions/geoActions";

import { Locality } from "@interfaces";

interface AutocompleteMunicipioProps {
  province: string;
  value?: string;
  //
  onSelect: (value?: Locality) => void;
}

const AutocompleteMunicipio: React.FunctionComponent<
  AutocompleteMunicipioProps
> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const dispatch = useDispatch<AppDispatch>();
  const { towns } = useSelector((state: RootState) => state.geo);

  const [localitySelected, setLocalitySelected] = useState<Locality>();
  const valueTown = props.value ? props.value.toUpperCase() : "";

  let first = true;

  useEffect(() => {
    if (first && props.province !== "") {
      dispatch(GetTowns(props.province));
      first = false;
    }
  }, [props.province]);

  useEffect(() => {
    if (towns !== undefined && props.value !== undefined && towns.length > 0) {
      const value = towns.find(
        (item: Locality) =>
          item.municipio_nombre !== null &&
          item.municipio_nombre.toUpperCase() === valueTown
      );
      setLocalitySelected(value!);
    }
  }, [towns]);

  const handleSelect = (value: Locality) => {
    setLocalitySelected(value);
    props.onSelect(value);
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Autocomplete
        disabled={props.province === ""}
        fullWidth
        disablePortal
        options={Array.isArray(towns) ? towns : []}
        getOptionLabel={(option: Locality) => option.municipio_nombre || ""}
        renderInput={(params) => (
          <TextField {...params} label="Municipio" key={params.id} />
        )}
        size="small"
        value={localitySelected ? localitySelected : null}
        //
        onChange={(event, value) => handleSelect(value!)}
      />
    </ThemeProvider>
  );
};

export default AutocompleteMunicipio;
