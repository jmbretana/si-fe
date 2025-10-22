import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "../theme/getSignUpTheme";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { GetLocalities } from "@actions/geoActions";

import { Locality } from "@interfaces";

interface AutocompleLocalidadProps {
  province: string;
  town: string;
  value?: string;
  //
  onSelect: (value?: Locality) => void;
}

const AutocompleteLocalidad: React.FunctionComponent<
  AutocompleLocalidadProps
> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const dispatch = useDispatch<AppDispatch>();
  const { localities } = useSelector((state: RootState) => state.geo);
  const [localitySelected, setLocalitySelected] = useState<Locality>();

  let first = true;

  useEffect(() => {
    if (first && props.province !== "" && props.town !== "") {
      dispatch(GetLocalities(props.province, props.town));
      first = false;
    }
  }, [props.province, props.town]);

  useEffect(() => {
    if (localities !== undefined && props.value !== undefined) {
      if (Array.isArray(localities) && props.value !== undefined) {
        const value = localities.find(
          (item: Locality) =>
            item.localidad_nombre.toUpperCase() === props.value!.toUpperCase()
        );
        setLocalitySelected(value ? value : "");
      }
    }
  }, [localities]);

  const handleSelect = (value: Locality) => {
    setLocalitySelected(value);
    props.onSelect(value);
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Autocomplete
        disabled={props.town === ""}
        fullWidth
        disablePortal
        options={Array.isArray(localities) ? localities : []}
        getOptionLabel={(option: Locality) => option.localidad_nombre || ""}
        renderInput={(params) => (
          <TextField {...params} label="Localidad" key={params.id} />
        )}
        size="small"
        value={localitySelected ? localitySelected : null}
        //
        onChange={(event, value) => handleSelect(value!)}
      />
    </ThemeProvider>
  );
};

export default AutocompleteLocalidad;
