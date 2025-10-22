import { configureStore } from "@reduxjs/toolkit";

import { AccountReducer } from "src/middleware/redux/accountsReducer";
import { AccountProviderReducer } from "src/middleware/redux/accountsProviderReducer";
import { authReducer } from "src/middleware/redux/authReducer";
import { BudgetReducer } from "src/middleware/redux/budgetsReducer";
import { ClientReducer } from "src/middleware/redux/clientsReducer";
import { ComprobanteProviderReducer } from "src/middleware/redux/comprobanteProviderReducer";
import { ConfigParamsReducer } from "src/middleware/redux/configParamsReducer";
import { CreditNoteReducer } from "src/middleware/redux/creditNotesReducer";
import { DistributionReducer } from "src/middleware/redux/distributionsReducer";
import { GeoReducer } from "src/middleware/redux/geoReducer";
import { ProductReducer } from "src/middleware/redux/productsReducer";
import { ProviderReducer } from "src/middleware/redux/providerReducer";
import { SnackReducer } from "src/middleware/redux/snackReducer";
import { UserReducer } from "src/middleware/redux/usersReducer";

export const store = configureStore({
  reducer: {
    accounts: AccountReducer,
    accountsProvider: AccountProviderReducer,
    auth: authReducer,
    clients: ClientReducer,
    comprobantesProvider: ComprobanteProviderReducer,
    configParams: ConfigParamsReducer,
    creditNotes: CreditNoteReducer,
    distributions: DistributionReducer,
    geo: GeoReducer,
    budgets: BudgetReducer,
    products: ProductReducer,
    providers: ProviderReducer,
    snack: SnackReducer,
    users: UserReducer,
  },
});

// Define RootState and AppDispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
