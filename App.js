import React from "react";
import { View,Text } from "react-native";
import ProductCard from "./Screens/Product/ProductCard";
import Header from "./Shared/Header";

export default function App() {
  return (
    <View>
        <Header />
        <ProductCard />
    </View>
  );
}

