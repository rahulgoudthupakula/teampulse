import React, { createContext, useContext, useReducer, ReactNode,useEffect } from "react";
import axios from 'axios';
// Define the shape of our global state
interface User {
  name: string;
  email: string;
  profile_url: string;
}

interface GlobalState {
  user: User | null;
  notifications: string[];
}

// Define the types of actions we can dispatch
type Action =
  | { type: "SET_USER"; payload: Partial<User> } // Support partial updates
  | { type: "CLEAR_USER" }
  | { type: "ADD_NOTIFICATION"; payload: string }
  | { type: "CLEAR_NOTIFICATIONS" };

// Create the initial state
const initialState: GlobalState = {
  user: {
    name: '',
    email: '',
    profile_url: "https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/user-avatar/png/15.png?d=100x100"
  },
  notifications: [],
};


// Reducer function to handle actions
function reducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: {
          ...state.user, // Spread existing fields
          ...action.payload, // Merge new fields (handles partial updates)
        } as User, // Ensure the resulting object matches the `User` type
      };
    case "CLEAR_USER":
      return { ...state, user: null };
    case "ADD_NOTIFICATION":
      return { ...state, notifications: [...state.notifications, action.payload] };
    case "CLEAR_NOTIFICATIONS":
      return { ...state, notifications: [] };
    default:
      throw new Error(`Unhandled action type: ${(action as Action).type}`);
  }
}


// Create the context
const GlobalStateContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

// Provider component for wrapping the app
export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

// Custom hook for accessing global state
export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
}
