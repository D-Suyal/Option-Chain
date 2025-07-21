import { StyleSheet } from "react-native";

const shimmerTableStyles = StyleSheet.create({
  row: {
    flexDirection: "row", alignItems: "center", height: 42, marginBottom: 8,
    borderRadius: 6, overflow: "hidden", backgroundColor: "#f4f6fa",
  },
  cell: {
    flex: 1, height: 20, borderRadius: 5, marginHorizontal: 4, backgroundColor: "#e9ecf2"
  },
  strike: {
    flex: 1, height: 24, backgroundColor: "#d1e5f8",
  }
});

export default shimmerTableStyles;
