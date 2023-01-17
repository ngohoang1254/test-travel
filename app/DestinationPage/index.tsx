/* eslint-disable react-hooks/exhaustive-deps */
import BannerCarouselComponent from "@/components/common/BannerCarouselComponent";
// import DataPackageComponent from "@/components/common/DataPackageComponent";
import FooterComponent from "@/components/common/FooterComponent";
import HeaderComponent from "@/components/common/Header";
import LayoutComponent from "@/components/common/LayoutComponent";
import OutstandingDestinationComponent from "@/components/common/OutstandingDestinationComponent";
import WhatToEatComponent from "@/components/common/WhatToEatComponent";
import WhatToPlayComponent from "@/components/common/WhatToPlayComponent";
import WhereToGoComponent from "@/components/common/WhereToGoComponent";
import SpinComponent from "@/components/stuff/SpinComponent";
import { CategoryInfo, RelatedPosts } from "@/models/Destination";
import { useAppDispatch, useAppSelector } from "@/redux-store/stores";
import { StatusCategory } from "@/utils/functions";
import { useRouter } from "next/router";
import React, { memo, useCallback, useEffect } from "react";
import BannerDestination from "./BannerDestination";
type Props = {};

 function DestinationPage({ }: Props) {
  const {
    query: { destinationId },
    push,
  } = useRouter();
  const { dataDestination, dataOutstanding, isLoadingBannerDestination } = useAppSelector(
    (state) => state.destination
  );
  const { fetchDestination, fetchDestinationOutstanding, updateData } =
    useAppDispatch().destination;

  useEffect(() => {
    return () => {
      updateData({ dataDestination: {}, dataOutstanding: [], isLoadingBannerDestination: false});
    };
  }, []);

  useEffect(() => {
    if (destinationId) {
      fetchDestination(destinationId as string);
      fetchDestinationOutstanding(destinationId as string);
    }
  }, [destinationId]);

  const handleRedirectPopup = useCallback(
    (type: string, item?: RelatedPosts & CategoryInfo) => {
      return () => {
        let pathname = "";
        switch (type) {
          case "main": {
            pathname = `/khamphavietnam/${destinationId}/${item?.main_post?.slug}`;
            break;
          }
          default: {
            pathname = `/khamphavietnam/${destinationId}/${item?.slug}`;
            break;
          }
        }
        push(
          {
            pathname: pathname,
          },
          undefined,
          { scroll: true }
        );
      };
    },
    [dataDestination, destinationId]
  );
  
  return (
    <LayoutComponent backgroundcolor="#FFFFFF">
      {isLoadingBannerDestination && (
        <SpinComponent
          isLoading={true}
        />
      )}

      <HeaderComponent />

      <BannerDestination />

      <BannerCarouselComponent
        description={dataDestination?.description}
        slide_image={dataDestination?.slide_image}
      />

      {/* suggestion */}
      {(dataDestination?.category_info || []).map(
        (item: CategoryInfo, index: number) => {
          let jsx = <></>;

          if (item?.use_list_post && item.main_post) {
            switch (item?.sub_category?.id) {
              case StatusCategory.WHERETOGO: {
                jsx = (
                  <WhereToGoComponent
                    key={index}
                    itemRender={item}
                    handleRedirectPopup={handleRedirectPopup}
                  />
                );
                break;
              }
              case StatusCategory.WHATTOEAT: {
                jsx = (
                  <WhatToEatComponent
                    key={index}
                    itemRender={item}
                    handleRedirectPopup={handleRedirectPopup}
                  />
                );
                break;
              }
              case StatusCategory.WHATTOPLAY: {
                jsx = (
                  <WhatToPlayComponent
                    key={index}
                    itemRender={item}
                    handleRedirectPopup={handleRedirectPopup}
                  />
                );
                break;
              }
              default: {
                jsx = <></>;
                break;
              }
            }
          }

          return jsx;
        }
      )}
      {dataOutstanding && <OutstandingDestinationComponent />}

      {/* <DataPackageComponent backgroundColor="#f6f6f6"/> */}

      <FooterComponent />
    </LayoutComponent>
  );
}

export default memo(DestinationPage)