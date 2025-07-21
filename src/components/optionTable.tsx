import React from "react";
import { FlatList, View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from "react-native";
import { OptionTableRow } from "../types/optionTypes";
import OptionRow from "./optionRow";
import ShimmerTable from "./shimmerTable";
import optionTableStyles from "../styles/optionTableStyles";
import { OptionTableProps } from "../types/optionTypes";

const OptionTable: React.FC<OptionTableProps> = ({ tableData, loading, error, onRetry }) => {
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const BOTTOM_PADDING = 175;

    // Memoize renderItem to avoid unnecessary re-renders
    const renderItem = React.useCallback(
      ({ item }: { item: OptionTableRow }) => (
        <OptionRow
          call_close={item.call_close}
          put_close={item.put_close}
          strike={item.strike}
        />
      ),
      []
    );

    return (
        <View
            style={[optionTableStyles.table, { width: screenWidth, height: screenHeight - BOTTOM_PADDING }]}
        >
            <View style={optionTableStyles.headerRow}>
            <Text style={optionTableStyles.headerCell}>CALL (LTP)</Text>
            <Text style={optionTableStyles.headerCell}>STRIKE</Text>
            <Text style={optionTableStyles.headerCell}>PUT (LTP)</Text>
            </View>
            {loading ? (
              <ShimmerTable />
            ) : error ? (
              <View style={optionTableStyles.errorBox}>
                <Text style={optionTableStyles.errorText}>
                  {typeof error === "string" ? error : "Error fetching data"}
                </Text>
                {onRetry && (
                  <TouchableOpacity style={optionTableStyles.retryBtn} onPress={onRetry}>
                    <Text style={optionTableStyles.retryBtnText}>Retry</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : tableData.length === 0 ? (
              <View style={optionTableStyles.emptyBox}>
                <Text style={optionTableStyles.emptyText}>No data found for this expiry.</Text>
              </View>
            ) : (
            <FlatList
                data={tableData}
                keyExtractor={item => item.strike.toString()}
                renderItem={renderItem}
                initialNumToRender={15}
                maxToRenderPerBatch={40}
                windowSize={7}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
            />)}
        </View>
    );
};

export default React.memo(OptionTable);
