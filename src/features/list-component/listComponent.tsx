import React from "react";
import { ErrorComponent } from "../../components/error";
import { LoadingComponent } from "../../components/loader";
import { useActivity } from "../../hooks/useActivity";
import { useList } from "../../hooks/useList";
import { Activity } from "../../models/activity";
import { ModuleListConfiguration } from "../../models/moduleListConfig";
import { ActivityList } from "../activity-compoent/activityComponent";
import { ActivtyItem } from "../activity-compoent/activityItem/activtyItem";
import CarrouselComponent from "../carrousel-component/carrouselComponent";
import {
  HeaderBanner,
  BannerContainer,
  EmptyDestinys,
  InputContainer,
} from "./listComponent.styled";

interface ListProps {
  config: ModuleListConfiguration
  currentSlide: number
}

export const ListComponent: React.FC<ListProps> = (
  { config, currentSlide }
) => {
  const { configuration, currentSlideSelected } = useList(
    config,
    currentSlide,
  );
  const {
    activityList,
    selectActivity,
  } = useActivity();

  const handleClick = (id: string) => {
    selectActivity(id);
  };
  return (
    <>
      {
        configuration.bannerActivated && configuration.images ?
          <BannerContainer>
            <HeaderBanner imageUrl={configuration.images[currentSlideSelected]} />
          </BannerContainer>
          : null
      }
      <InputContainer>
      {
          configuration.carrousel ?
            <CarrouselComponent
            /> :
            <ActivityList
              error={false}
              loading={false}
              searchedActivitis={activityList}
              onLoading={() => <LoadingComponent />}
              onError={() => <ErrorComponent />}
              onEmptyActivitis={() => <EmptyDestinys />}
              render={
                (act: Activity) => (
                  <ActivtyItem
                    onHandleClick={() => handleClick(act.id)}
                    id={act.id}
                    key={act.id}
                    selected={act.selected}
                  >
                    {act.text}
                  </ActivtyItem>
                )
              }
            >
            </ActivityList>
        }
      </InputContainer>
    </>

  )
};
