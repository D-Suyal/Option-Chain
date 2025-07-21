import React from "react";
import { View, StyleSheet } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import shimmerTableStyles from "../styles/shimmerTableStyles";

const ShimmerTable = () => (
  <View style={{ padding: 16 }}>
    {Array.from({ length: 15 }).map((_, i) => (
      <View key={i} style={shimmerTableStyles.row}>
        <ShimmerPlaceHolder
          style={shimmerTableStyles.cell}
        />
        <ShimmerPlaceHolder
          style={[shimmerTableStyles.cell, shimmerTableStyles.strike]}
        />
        <ShimmerPlaceHolder
          style={shimmerTableStyles.cell}
        />
      </View>
    ))}
  </View>
);

export default ShimmerTable;
