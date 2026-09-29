import {createContext} from "react";

import {SnackbarContextValue} from "./types";

export const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined);
