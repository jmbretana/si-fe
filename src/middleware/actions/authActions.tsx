import axios from "axios";
import { Dispatch } from "redux";
import { AuthUser, LoginCredentials, LoginResponse } from "@interfaces";
import { logger } from "@utils/logger";
import { API_URL_SERVER } from "@utils/constants";
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  AUTH_UPDATE_USER_REQUEST,
  AUTH_UPDATE_USER_SUCCESS,
  AUTH_UPDATE_USER_FAILURE,
  AUTH_CLEAR_ERROR,
  AUTH_SET_LOADING,
  AUTH_CHECK_TOKEN,
  AUTH_INITIALIZE,
  AUTH_REFRESH_TOKEN_REQUEST,
  AUTH_REFRESH_TOKEN_SUCCESS,
  AUTH_REFRESH_TOKEN_FAILURE,
  AUTH_RESET_LOGIN_ATTEMPTS,
  AUTH_INCREMENT_LOGIN_ATTEMPTS,
} from "../types/AuthActionTypes";

// API URL configuration
const apiURL = API_URL_SERVER + "/auth/";

// Action Creators
export const loginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const loginSuccess = (user: AuthUser, token: string) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: { user, token },
});

export const loginFailure = (error: string) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
});

export const logoutRequest = () => ({
  type: AUTH_LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS,
});

export const logoutFailure = (error: string) => ({
  type: AUTH_LOGOUT_FAILURE,
  payload: error,
});

export const updateUserRequest = () => ({
  type: AUTH_UPDATE_USER_REQUEST,
});

export const updateUserSuccess = (user: AuthUser) => ({
  type: AUTH_UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFailure = (error: string) => ({
  type: AUTH_UPDATE_USER_FAILURE,
  payload: error,
});

export const clearError = () => ({
  type: AUTH_CLEAR_ERROR,
});

export const setLoading = (isLoading: boolean) => ({
  type: AUTH_SET_LOADING,
  payload: isLoading,
});

export const checkToken = () => ({
  type: AUTH_CHECK_TOKEN,
});

export const initializeAuth = () => ({
  type: AUTH_INITIALIZE,
});

export const resetLoginAttempts = () => ({
  type: AUTH_RESET_LOGIN_ATTEMPTS,
});

export const incrementLoginAttempts = () => ({
  type: AUTH_INCREMENT_LOGIN_ATTEMPTS,
});

// Async Actions
export const login = (credentials: LoginCredentials) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loginRequest());

      logger.info("Login attempt started:", { username: credentials.username });

      const response = await axios.post<LoginResponse>(
        `${apiURL}login`,
        credentials
      );

      logger.info("API response received:", {
        status: response.status,
        data: response.data,
      });

      const { user, token } = response.data.data;

      // Validate response data
      if (!user || !token) {
        throw new Error("Invalid response: missing user or token");
      }

      logger.info("User data from response:", user);
      logger.info("Token received:", token.substring(0, 20) + "...");

      // Store token in localStorage if rememberMe is true
      if (credentials.rememberMe) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("username", user.username);
        logger.info("Stored in localStorage");
      } else {
        // Store in sessionStorage for session-only persistence
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("username", user.username);
        logger.info("Stored in sessionStorage");
      }

      // Verify storage
      const storedToken = credentials.rememberMe
        ? localStorage.getItem("authToken")
        : sessionStorage.getItem("authToken");
      const storedUser = credentials.rememberMe
        ? localStorage.getItem("user")
        : sessionStorage.getItem("user");

      logger.info(
        "Verification - stored token:",
        storedToken?.substring(0, 20) + "..."
      );
      logger.info("Verification - stored user:", storedUser);

      dispatch(loginSuccess(user, token));
      dispatch(resetLoginAttempts());

      logger.info(
        "Redux dispatch completed - User logged in successfully:",
        user.username
      );
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error durante el login";

      logger.error("Login failed:", {
        error: errorMessage,
        fullError: error,
        response: error.response?.data,
      });

      dispatch(loginFailure(errorMessage));
      dispatch(incrementLoginAttempts());
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(logoutRequest());

      // Call logout API if needed
      try {
        await axios.post(`${apiURL}logout`);
      } catch {
        // Continue with logout even if API call fails
        logger.warn("Logout API call failed, but continuing with local logout");
      }

      // Clear all auth data
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("username");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("username");

      dispatch(logoutSuccess());

      logger.info("User logged out successfully");
    } catch (error: any) {
      const errorMessage = error.message || "Error durante el logout";
      dispatch(logoutFailure(errorMessage));
      logger.error("Logout failed:", errorMessage);
    }
  };
};

export const updateUser = (userData: Partial<AuthUser>) => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch(updateUserRequest());

      const { auth } = getState();
      const token = auth.token;

      const response = await axios.put<AuthUser>(`${apiURL}user`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUser = response.data;

      // Update stored user data
      const userStorage = localStorage.getItem("user")
        ? localStorage
        : sessionStorage;
      userStorage.setItem("user", JSON.stringify(updatedUser));

      dispatch(updateUserSuccess(updatedUser));

      logger.info("User updated successfully:", updatedUser.username);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error al actualizar usuario";

      dispatch(updateUserFailure(errorMessage));
      logger.error("User update failed:", errorMessage);
    }
  };
};

export const refreshToken = () => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({ type: AUTH_REFRESH_TOKEN_REQUEST });

      const { auth } = getState();
      const currentToken = auth.token;

      const response = await axios.post<{ token: string }>(
        `${apiURL}refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      const { token: newToken } = response.data;

      // Update token in storage
      const tokenStorage = localStorage.getItem("authToken")
        ? localStorage
        : sessionStorage;
      tokenStorage.setItem("authToken", newToken);

      dispatch({
        type: AUTH_REFRESH_TOKEN_SUCCESS,
        payload: newToken,
      });

      logger.info("Token refreshed successfully");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error al renovar token";

      dispatch({
        type: AUTH_REFRESH_TOKEN_FAILURE,
        payload: errorMessage,
      });

      // If refresh fails, logout user
      dispatch(logoutSuccess());

      logger.error("Token refresh failed:", errorMessage);
    }
  };
};

export const initializeAuthFromStorage = () => {
  return (dispatch: Dispatch) => {
    try {
      // Check localStorage first, then sessionStorage
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      const userString =
        localStorage.getItem("user") || sessionStorage.getItem("user");

      if (token && userString) {
        try {
          const user: AuthUser = JSON.parse(userString);
          // Validate that the parsed user has required properties
          if (user && typeof user === "object" && user.id && user.username) {
            dispatch(loginSuccess(user, token));
            logger.info("Auth state initialized from storage");
          } else {
            logger.warn("Invalid user data in storage");
            // Clear invalid data
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            sessionStorage.removeItem("authToken");
            sessionStorage.removeItem("user");
            dispatch(initializeAuth());
          }
        } catch (parseError) {
          logger.error("Error parsing user data from storage:", parseError);
          // Clear corrupted data
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          sessionStorage.removeItem("authToken");
          sessionStorage.removeItem("user");
          dispatch(initializeAuth());
        }
      } else {
        dispatch(initializeAuth());
      }
    } catch (error) {
      logger.error("Error initializing auth from storage:", error);
      dispatch(initializeAuth());
    }
  };
};

export const checkTokenValidity = () => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      if (!token) {
        logger.info("No token found, skipping validity check");
        return;
      }

      await axios.get(`${apiURL}verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      logger.info("Token is valid");
    } catch (error: any) {
      logger.warn("Token is invalid, logging out user", error?.response?.status || 'unknown error');
      // Force logout by clearing auth state - this will trigger the redirect in AuthContext
      dispatch(logoutSuccess());
    }
  };
};
