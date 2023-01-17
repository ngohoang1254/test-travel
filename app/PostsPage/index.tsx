/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect } from "react";
import BannerComponent from "@/components/common/BannerComponent";
// import DataPackageComponent from "@/components/common/DataPackageComponent";
import FooterComponent from "@/components/common/FooterComponent";
import HeaderComponent from "@/components/common/Header";
import LayoutComponent from "@/components/common/LayoutComponent";
import GeneralInformation from "./GeneralInformation";
import TheBestHere from "./TheBestHere";
import ComeMustTry from "./ComeMustTry";
import CarouselPaginationBetween from "@/components/common/CarouselPaginationBetween";
import Upcoming from "./Upcoming";
import FreeExperience from "./FreeExperience";
import { useAppDispatch, useAppSelector } from "@/redux-store/stores";
import { useRouter } from "next/router";
import Content from "./Content";
import { Post } from "@/models/Posts";
import SpinComponent from "@/components/stuff/SpinComponent";

type Props = {};

function PostsPage({}: Props) {
  const {
    query: { destinationId, postsId },
    replace,
  } = useRouter();
  const { push } = useRouter();
  const { dataPosts, isLoadingBannerPosts } = useAppSelector(
    (state) => state.posts
  );
  const { map, ticket, enjoy_relax, menu, main_info } = dataPosts || {};
  const { sapo, title, thumbnail, best_yummy, upcoming } = dataPosts || {};
  const { fetchPosts, updateData } = useAppDispatch().posts;

  useEffect(() => {
    if (postsId) {
      fetchPosts(postsId as string);
    }
  }, [postsId]);

  useEffect(() => {
    if (Object?.keys(dataPosts)?.length > 0) {
      replace(
        {
          pathname: `/khamphavietnam/${destinationId}/${dataPosts?.slug}`,
        },
        undefined,
        { shallow: true }
      );
    }
  }, [dataPosts]);

  useEffect(() => {
    return () => {
      updateData({ dataPosts: {}, isLoadingBannerPosts: false });
    };
  }, []);

  const handleRedirect = useCallback(
    (item: any) => {
      return () => {
        push(`/khamphavietnam/${destinationId}/${item?.slug}`, undefined, {
          scroll: true,
        });
        // window.open(`/khamphavietnam/${destinationId}/${item?.slug}`);
      };
    },
    [postsId, destinationId]
  );
  
  return (
    <LayoutComponent backgroundcolor="#fefefe">
      {isLoadingBannerPosts && !dataPosts?.statusCode && (
        <SpinComponent isLoading={true} />
      )}

      <HeaderComponent />
      {dataPosts?.statusCode &&
        dataPosts?.statusCode >= 400 &&
        dataPosts?.message && (
          <h1
            style={{
              textAlign: "center",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "50px",
            }}
          >
            Không tìm thấy bài viết
          </h1>
        )}
      <BannerComponent
        img={thumbnail?.url || ""}
        bannerTitle={title || ""}
        bannerSubTitle={<i>{sapo}</i>}
        key={"PostsPage-2"}
        bannerSubTitleType="italic"
        onLoadBanner={() => {
          updateData({
            isLoadingBannerPosts: false,
          });
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 700);
        }}
        breakpointsTitle={{
          2560: {
            top: "50%",
          },
          1023: {
            top: "50%",
          },
        }}
      />

      <GeneralInformation />

      {!map?.enabled &&
        !ticket?.enabled &&
        !enjoy_relax?.enabled &&
        !menu?.enabled &&
        !main_info?.enabled && <Content />}

      <FreeExperience />

      {dataPosts?.best_yummy?.enabled &&
        best_yummy?.yummy_content &&
        best_yummy?.yummy_content?.length > 0 && <TheBestHere />}

      {dataPosts?.must_try?.enabled && (
        // must_try?.slide_must_try &&
        // must_try?.slide_must_try?.length > 0 &&
        <ComeMustTry />
      )}

      {(map?.enabled ||
        ticket?.enabled ||
        enjoy_relax?.enabled ||
        menu?.enabled ||
        main_info?.enabled) && <Content />}

      {dataPosts?.upcoming?.enabled &&
        upcoming?.upcoming_item &&
        upcoming?.upcoming_item?.length > 0 && <Upcoming />}

      {dataPosts?.related_post && (
        <CarouselPaginationBetween<Post>
          title={"Bài viết liên quan"}
          listItem={dataPosts?.related_posts || []}
          width={420}
          handleRedirect={handleRedirect}
        />
      )}

      {dataPosts?.for_you && (
        <CarouselPaginationBetween<Post>
          title={"Dành riêng cho bạn"}
          listItem={dataPosts?.for_you_posts || []}
          width={640}
          handleRedirect={handleRedirect}
        />
      )}

      {/* <DataPackageComponent /> */}

      <FooterComponent />
    </LayoutComponent>
  );
}

export default memo(PostsPage);
