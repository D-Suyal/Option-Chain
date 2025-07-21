
# BankNifty Option Chain App

This is a **React Native** project that displays the real-time BANKNIFTY option chain, updating prices via WebSocket for a live experience.

---

## Getting Started

> **Note**: Please ensure you’ve set up your environment as per the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment).

### Step 1: Start Metro

```bash
npm start    # or yarn start
```

### Step 2: Build and Run Your App

**Android:**
```bash
npm run android   # or yarn android
```

**iOS:**
```bash
# If using CocoaPods:
cd ios && pod install
cd ..
npm run ios   # or yarn ios
```

---

## Component Tree & Functional Overview

The codebase is modular, with each layer separated for clarity and scalability:

```
src
├── components
│   ├── expiryFilter.tsx         # Horizontal expiry selector (shows dates, highlights selected, days remaining)
│   ├── optionRow.tsx            # One row: CALL (LTP), STRIKE, PUT (LTP) – memoized for performance
│   ├── optionTable.tsx          # Table of option rows, with loading/error/empty state handling
│   └── shimmerTable.tsx         # Skeleton loading effect for option table
├── config
│   └── config.ts                # App-wide constants/configuration
├── constants
│   └── urlContants.ts           # All API/WebSocket endpoint URLs
├── hooks
│   └── useOptionChain.ts        # Central logic: fetches contracts, manages expiry, streams data
├── screens
│   └── optionChainScreen.tsx    # Main screen: orchestrates ExpiryFilter & OptionTable
├── services
│   └── webSocketService.ts      # WebSocket connection logic and live updates
├── styles
│   ├── appStyles.ts
│   ├── expiryFilterStyles.ts
│   ├── optionRowStyles.ts
│   ├── optionTableStyles.ts
│   └── shimmerTableStyles.ts
├── types
│   └── optionTypes.ts           # TypeScript interfaces/types for all contracts, table rows, component props
|── utils
|   └── optionTableDataUpdater.ts # Helper functions for transforming/updating option table data
|
App.tsx                           # Entry point, wraps everything in SafeAreaView
```

---

### Module Responsibilities

- **App.tsx**  
  Entry point; wraps the UI in a SafeAreaView and renders `OptionChainScreen`.

- **screens/optionChainScreen.tsx**  
  Orchestrates the option chain UI. Uses the custom hook to manage all state and passes data to the UI components (`ExpiryFilter`, `OptionTable`).

- **components/expiryFilter.tsx**  
  Displays all available expiry dates as horizontally scrollable buttons, highlights selected expiry, and shows days left. Calls back to change expiry selection.

- **components/optionTable.tsx**  
  Displays a table with a header row (`CALL`, `STRIKE`, `PUT`) and renders each row using `OptionRow`. Handles loading with `ShimmerTable`, errors, and empty data.

- **components/optionRow.tsx**  
  Displays a single row of the option chain. Shows Call price (LTP), Strike, and Put price. Uses React.memo for efficient updates.

- **components/shimmerTable.tsx**  
  Renders a skeleton (shimmer) placeholder while data is loading, improving perceived performance.

- **hooks/useOptionChain.ts**  
  Contains main logic for data fetching, expiry selection, and WebSocket live updates. Manages all the state and effects for real-time updates.

- **services/webSocketService.ts**  
  Handles WebSocket connection, subscription messages, receiving and dispatching real-time LTP updates.

- **utils/optionTableDataUpdater.ts**  
  Provides pure helper functions for transforming contract and WebSocket update data into the correct table structure for display.

- **config/config.ts**  
  Stores global constants or configuration values for the app (for example, timeouts, feature flags).

- **constants/urlContants.ts**  
  Centralizes all API and WebSocket URLs for easy maintenance and reference.

- **types/optionTypes.ts**  
  All TypeScript interfaces and types for contracts, table rows, expiries, and all component props, ensuring type safety throughout the app.

- **styles/**  
  All component-specific style files, keeping styles modular and maintainable.

---

## Project Flow

1. **App.tsx** boots the app and renders the main screen.
2. **OptionChainScreen** initializes data, manages expiry selection, and updates option chain using `useOptionChain`.
3. **ExpiryFilter** allows user to select expiry (filter).
4. **OptionTable** displays the option chain (calls, strikes, puts) with real-time price updates.
5. **OptionRow** renders individual rows.
6. **ShimmerTable** appears while loading data.

---

## Troubleshooting

For build or runtime issues, refer to the official React Native [Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting).

---

## Learn More

- [React Native Docs](https://reactnative.dev)
- [Fast Refresh](https://reactnative.dev/docs/fast-refresh)
- [Shimmer Placeholder](https://github.com/tomzaku/react-native-shimmer-placeholder)

---

Congratulations! You’re ready to use, explore, and extend the BANKNIFTY Option Chain app.

---

**Let me know if you want to add a “Features” section, API documentation, screenshots, or usage examples!**