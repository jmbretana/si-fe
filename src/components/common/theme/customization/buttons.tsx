import { alpha, Theme, Components } from "@mui/material/styles";
import { toggleButtonGroupClasses } from "@mui/material/ToggleButtonGroup";
import { toggleButtonClasses } from "@mui/material/ToggleButton";
import { gray, brand, black } from "@common/theme/themePrimitives";
import { COLORS } from "@values/colors";

export const buttonCustomizations: Components<Theme> = {
  MuiButtonBase: {
    defaultProps: {
      disableTouchRipple: true,
      disableRipple: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        boxSizing: "border-box",
        transition: "all 100ms ease-in",
        fontFamily: "Lexend, Arial, sans-serif", // Definir la font-family
        "&:focus-visible": {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: "2px",
        },
      }),
    },
  },

  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: "none",
        textTransform: "none",
        borderRadius: "20px",
        padding: "5px 20px !important",
        height: "35px",
        fontFamily: "Lexend, Arial, Helvetica, sans-serif",

        variants: [
          {
            props: {
              size: "small",
            },
            style: {
              height: "2.25rem",
              padding: "8px 12px",
            },
          },
          {
            props: {
              size: "medium",
            },
            style: {
              height: "2.5rem", // 40px
            },
          },
          {
            props: {
              color: "primary",
              variant: "contained",
            },
            style: {
              color: "white",
              backgroundColor: gray[900],
              backgroundImage: `linear-gradient(to bottom, ${gray[700]}, ${gray[800]})`,
              boxShadow: `inset 0 1px 0 ${gray[600]}, inset 0 -1px 0 1px hsl(220, 0%, 0%)`,
              border: `1px solid ${gray[700]}`,
              "&:hover": {
                backgroundImage: "none",
                backgroundColor: gray[700],
                boxShadow: "none",
              },
              "&:active": {
                backgroundColor: gray[800],
              },
              ...theme.applyStyles("dark", {
                color: "black",
                backgroundColor: gray[50],
                backgroundImage: `linear-gradient(to bottom, ${gray[100]}, ${gray[50]})`,
                boxShadow: "inset 0 -1px 0  hsl(220, 30%, 80%)",
                border: `1px solid ${gray[50]}`,
                "&:hover": {
                  backgroundImage: "none",
                  backgroundColor: gray[300],
                  boxShadow: "none",
                },
                "&:active": {
                  backgroundColor: gray[400],
                },
              }),
            },
          },
          {
            props: {
              color: "secondary",
              variant: "contained",
            },
            style: {
              color: "white",
              backgroundColor: brand[300],
              backgroundImage: `linear-gradient(to bottom, ${alpha(
                brand[400],
                0.8
              )}, ${brand[500]})`,
              boxShadow: `inset 0 2px 0 ${alpha(
                brand[200],
                0.2
              )}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
              border: `1px solid ${brand[500]}`,
              "&:hover": {
                backgroundColor: brand[700],
                boxShadow: "none",
              },
              "&:active": {
                backgroundColor: brand[700],
                backgroundImage: "none",
              },
            },
          },
          {
            props: {
              variant: "outlined",
            },
            style: {
              color: theme.palette.text.primary,
              border: "1px solid",
              borderColor: gray[200],
              backgroundColor: alpha(gray[50], 0.3),
              "&:hover": {
                backgroundColor: gray[100],
                borderColor: gray[300],
              },
              "&:active": {
                backgroundColor: gray[200],
              },
              ...theme.applyStyles("dark", {
                backgroundColor: gray[800],
                borderColor: gray[700],

                "&:hover": {
                  backgroundColor: gray[900],
                  borderColor: gray[600],
                },
                "&:active": {
                  backgroundColor: gray[900],
                },
              }),
            },
          },
          {
            props: {
              color: "secondary",
              variant: "outlined",
            },
            style: {
              color: brand[700],
              border: "1px solid",
              borderColor: brand[200],
              backgroundColor: brand[50],
              "&:hover": {
                backgroundColor: brand[100],
                borderColor: brand[400],
              },
              "&:active": {
                backgroundColor: alpha(brand[200], 0.7),
              },
              ...theme.applyStyles("dark", {
                color: brand[50],
                border: "1px solid",
                borderColor: brand[900],
                backgroundColor: alpha(brand[900], 0.3),
                "&:hover": {
                  borderColor: brand[700],
                  backgroundColor: alpha(brand[900], 0.6),
                },
                "&:active": {
                  backgroundColor: alpha(brand[900], 0.5),
                },
              }),
            },
          },
          {
            props: {
              color: "error",
              variant: "outlined",
            },
            style: {
              color: brand[700],
              border: "1px solid #d32f2f",
              backgroundColor: brand[50],
              "&:hover": {
                backgroundColor: "#f2d7d5",
                borderColor: "1px solid #d32f2f",
              },
              "&:active": {
                backgroundColor: alpha(brand[200], 0.7),
              },
              ...theme.applyStyles("dark", {
                color: "#d32f2f",
                border: "1px solid #d32f2f",
                backgroundColor: COLORS.white,
                "&:hover": {
                  backgroundColor: "#f2d7d5",
                },
                "&:active": {},
              }),
            },
          },
          {
            props: {
              variant: "text",
            },
            style: {
              color: black[600],
              "&:hover": {
                backgroundColor: black[100],
              },
              "&:active": {
                backgroundColor: black[200],
              },
              ...theme.applyStyles("dark", {
                color: black[50],
                "&:hover": {
                  backgroundColor: black[700],
                },
                "&:active": {
                  backgroundColor: alpha(black[700], 0.7),
                },
              }),
            },
          },
          {
            props: {
              color: "secondary",
              variant: "text",
            },
            style: {
              color: black[700],
              "&:hover": {
                backgroundColor: alpha(black[100], 0.5),
              },
              "&:active": {
                backgroundColor: alpha(black[200], 0.7),
              },
              ...theme.applyStyles("dark", {
                color: black[900],
                "&:active": {
                  backgroundColor: alpha(black[900], 0.3),
                },
              }),
            },
          },
        ],
      }),
    },
  },

  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: "10px",
        boxShadow: `0 4px 16px ${alpha(gray[400], 0.2)}`,
        [`& .${toggleButtonGroupClasses.selected}`]: {
          color: brand[500],
        },
        ...theme.applyStyles("dark", {
          [`& .${toggleButtonGroupClasses.selected}`]: {
            color: COLORS.white,
          },
          boxShadow: `0 4px 16px ${alpha(brand[700], 0.5)}`,
        }),
      }),
    },
  },

  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: "12px 16px",
        textTransform: "none",
        borderRadius: "10px",
        fontWeight: 500,
        ...theme.applyStyles("dark", {
          color: gray[400],
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
          [`&.${toggleButtonClasses.selected}`]: {
            color: brand[300],
          },
        }),
      }),
    },
  },
};
