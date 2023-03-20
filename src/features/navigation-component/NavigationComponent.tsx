import React, { useState } from "react";
import { ModuleNavigationConfiguration } from "../../models/moduleNavigationConfig";
import { ListComponent } from '../list-component/listComponent';
import { AddEventComponent } from '../addevent-component/addEventComponent';
import { OverviewComponent } from '../overview-component/OverviewComponent';
import { NoteComponent } from '../note-component/NoteComponent';
import { useNavigation } from "../../hooks/useNavigation";
import {
    MainContainer,
    NeonBox,
    LoadingArea,
    Arrow,
    Tab,
    TabContainer,
} from "./NavigationComponent.styled";

/* ESTOS VALORES LOS VAMOS A SACAR DEL BACKEND, POR EL MOMENTO LOS CREAMOS EXPLICITAMENTE ACA */
import { ModuleListConfiguration } from "../../models/moduleListConfig";
import { ModuleAddEventConfiguration } from "../../models/moduleAddEventConfig";
import { ModuleOverviewConfiguration } from "../../models/moduleOverviewConfig";
import { ModuleNoteConfiguration } from "../../models/moduleNoteConfig";
import img1 from "../../theme/cities/budapest.jpg";
import img2 from "../../theme/cities/budapest2.jpg";
import img3 from "../../theme/cities/budapest3.jpg";
import img4 from "../../theme/cities/budapest4.jpg";

const configurationList: ModuleListConfiguration = {
    bannerActivated: true,
    carrousel: true
}
const configurationAddEvent: ModuleAddEventConfiguration = {
themeColor: {
    cyan: 0,
    red: 0,
    blue: 0
},
leftArrow: false,
rightArrow: false,
}
const configurationOverview: ModuleOverviewConfiguration = {
textArea: "Budapest, Hungary \n\nBudapest is the capital and most populous city of Hungary. It is the ninth-largest city in the European Union by population within city limits and the second-largest city on the Danube river; the city has an estimated population of 1,752,286 over a land area of about 525 square kilometers (203 square miles). Budapest, which is both a city and county, forms the center of the Budapest metropolitan area, which has an area of 7,626 square kilometers (2,944 square miles) and a population of 3,303,786; it is a primate city, constituting 33% of the population of Hungary.",
}
const configurationNote: ModuleNoteConfiguration = {
textArea: "Budapest is the capital and most populous city of Hungary. It is the ninth-largest city in the European Union by population within city limits and the second-largest city on the Danube river; the city has an estimated population of 1,752,286 over a land area of about 525 square kilometers (203 square miles). Budapest, which is both a city and county, forms the center of the Budapest metropolitan area, which has an area of 7,626 square kilometers (2,944 square miles) and a population of 3,303,786; it is a primate city, constituting 33% of the population of Hungary.",
}

interface NavigationProps {
    config: ModuleNavigationConfiguration
}

export const NavigationComponent: React.FC<NavigationProps> = (
    { config }
) => {
    const { changeTab, configuration } = useNavigation(
        config,
    );
    const onClickLeftArrow = () => {
        console.log("Button Clicked, must save the Navigation component");
    };
    const onClickRightArrow = () => {
        console.log("Button Clicked, must back to TimeLine");
    };

    const componentToRender = (componentName: string) => {
        switch(componentName) {
            case 'list':
                return <ListComponent config={configurationList} imagesUrl={[img1, img2, img3, img4]} currentSlide={0}/>;
            case 'activity':
                return <ListComponent config={configurationList} imagesUrl={[img1, img2, img3, img4]} currentSlide={0}/>;
            case 'note':
                return <NoteComponent config={configurationNote}/>;
            case 'addevent':
                return <AddEventComponent config={configurationAddEvent}/>;
            default:
                return <OverviewComponent config={configurationOverview} imagesUrl={[img1, img2, img3, img4]} currentSlide={0}/>;
        }
    }
    const [isHoverArrowLeft, setIsHoverArrowLeft] = useState(false);

    const handleMouseEnterArrowLeft = () => {
        setIsHoverArrowLeft(true);
    };
  
    const handleMouseLeaveArrowLeft = () => {
        setIsHoverArrowLeft(false);
    };

    const [isHoverArrowRight, setIsHoverArrowRight] = useState(false);

    const handleMouseEnterArrowRight = () => {
        setIsHoverArrowRight(true);
    };
  
    const handleMouseLeaveArrowRight = () => {
        setIsHoverArrowRight(false);
    };
    const [isHoverTab, setIsHoverTab] = useState(-1);

    const handleMouseEnterTab = (tabSelected: number) => {
        setIsHoverTab(tabSelected);
    };
  
    const handleMouseLeaveTab = () => {
        setIsHoverTab(-1);
    };
    
    return (
        <>
            {
                configuration.rightArrow ?
                <div
                    onMouseEnter={handleMouseEnterArrowRight}
                    onMouseLeave={handleMouseLeaveArrowRight}
                >
                    <Arrow 
                        onClick={onClickRightArrow} 
                        color="white"
                        top="12vh"
                        left="70vw"
                        orientation="right"
                        isHoverArrowRight={isHoverArrowRight}
                    >
                        {'>'}
                    </Arrow> 
                </div>
                : null
            }
            {
                configuration.leftArrow ?
                <div
                    onMouseEnter={handleMouseEnterArrowLeft}
                    onMouseLeave={handleMouseLeaveArrowLeft}
                >
                    <Arrow 
                        onClick={onClickLeftArrow}
                        color="white" 
                        top="12vh"
                        left="22vw"
                        orientation="left"
                        isHoverArrowLeft={isHoverArrowLeft}
                    >
                        {'<'}
                    </Arrow> 
                </div>
                : null
            }
            <MainContainer
                maxWidth='40vw'
                height={configuration.height}
                mt='8'
            >
                {
                    configuration.tabPanel ?
                    <TabContainer>
                        <div
                            onMouseEnter={() => handleMouseEnterTab(0)}
                            onMouseLeave={handleMouseLeaveTab}
                        >
                            <Tab onClick={() => changeTab("overview")} color="white" activated={isHoverTab == -1 && configuration.activeComponentName == "overview" ? true : false} isHover={isHoverTab == 0 ? true : false} name="Overview"/>
                        </div>
                        <div
                            onMouseEnter={() => handleMouseEnterTab(1)}
                            onMouseLeave={handleMouseLeaveTab}
                        >
                            <Tab onClick={() => changeTab("addevent")} color="white" activated={isHoverTab == -1 && configuration.activeComponentName == "addevent" ? true : false} isHover={isHoverTab == 1 ? true : false} name="Activities"/>
                        </div>
                        <div
                            onMouseEnter={() => handleMouseEnterTab(2)}
                            onMouseLeave={handleMouseLeaveTab}
                        >
                            <Tab onClick={() => changeTab("note")} color="white" activated={isHoverTab == -1 && configuration.activeComponentName == "note" ? true : false} isHover={isHoverTab == 2 ? true : false} name="Notes"/>
                        </div>
                    </TabContainer> : null
                }
                <NeonBox>
                    <LoadingArea>
                        {
                            componentToRender(configuration.activeComponentName)
                        }
                    </LoadingArea>   
                </NeonBox>
            </MainContainer>
        </>
    )
};
