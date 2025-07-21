import React from "react";
import { View, Text } from "react-native";
import { useOptionChain } from "../hooks/useOptionChain";
import ExpiryFilter from "../components/expiryFilter";
import OptionTable from "../components/optionTable";
import { appStyles, cardStyles } from "../styles/appStyles";

const OptionChainScreen: React.FC = () => {
  const { validExpiry, selectedExpiry, setSelectedExpiry, latestTableData, loading, error } = useOptionChain();

  return (
    <View style={appStyles.container}>
      <Text style={cardStyles.title}>BANKNIFTY Option Chain</Text>
      <ExpiryFilter
        expiries={validExpiry}
        selectedExpiry={selectedExpiry}
        onSelect={setSelectedExpiry}
      />
      <OptionTable
        tableData={latestTableData}
        loading={loading}
        error={error}
      />
    </View>
  );
};

export default OptionChainScreen;
