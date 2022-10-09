import { ShopLayout } from "../../layouts";
import { TitledCard } from "../../components";
import { SimpleGrid } from "@mantine/core";
import { SkinsMock } from "../../../data";
import { ProductCard } from "./components";
import React from "react";
import { SHOP_CARDS_BREAKPOINTS } from "./adaptivity";


function ShopPage() {

  const TopPanel = <TitledCard title={'Мои скины'}>
    <SimpleGrid cols={6} breakpoints={SHOP_CARDS_BREAKPOINTS}>

    </SimpleGrid>
  </TitledCard>

  const BottomPanel = <TitledCard title={'Магазин'}>
    <SimpleGrid cols={6} breakpoints={SHOP_CARDS_BREAKPOINTS}>
      {SkinsMock.map(skin => <ProductCard key={`skin-card/${skin.id}`} {...skin} />)}
    </SimpleGrid>
  </TitledCard>

  return <ShopLayout
    topPanel={TopPanel}
    bottomPanel={BottomPanel}
  />
}

export default ShopPage