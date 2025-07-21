import React from "react";
import { View, Text } from "react-native";
import { OptionTableRow } from "../types/optionTypes";
import optionRowStyles from "../styles/optionRowStyles";

const OptionRow: React.FC<OptionTableRow> = ({ call_close, put_close, strike }) => (
  <View style={[optionRowStyles.row]}>
    <Text style={[optionRowStyles.cell, optionRowStyles.call]}>{call_close ?? "--"}</Text>
    <Text style={[optionRowStyles.cell, optionRowStyles.strike]}>{strike}</Text>
    <Text style={[optionRowStyles.cell, optionRowStyles.put]}>{put_close ?? "--"}</Text>
  </View>
);

function areEqual(prev: OptionTableRow, next: OptionTableRow) {
  return (
    prev.call_close === next.call_close &&
    prev.put_close === next.put_close &&
    prev.strike === next.strike
  );
}

export default React.memo(OptionRow, areEqual);