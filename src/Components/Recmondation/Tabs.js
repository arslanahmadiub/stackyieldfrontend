import React, { useState } from "react";
import Styled from "styled-components";

const TabHeader = Styled.div`
    display: flex;
    height: 50px;
    border-bottom: .05px solid lightgrey;
    width: 100%;
    
    position: relative;
    `;
const TabLabelItem = Styled.div`
    font-size: 20px;
    line-height: 50px;
    cursor: pointer;
    font-weight: 600;
    position: relative;
    color: ${(props) => (props.selected ? "white" : "#19469A")};
    padding: 0px 20px;
    background:${(props) => (props.selected ? "#19469A" : "white")};

    @media (max-width: 960px){
        font-size: 16px;
    }
`;

const TabBody = Styled.div`
    position: relative;
    top: 25px;

`;

const Tabs = (props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const headers = props.headers;
  const changeTab = (index) => (event) => {
    setSelectedTab(index);
  };
  let handelTabBodyClick = () => {
    if (showDatePicker) {
      setShowDatePicker(false);
      props.dateShow(!showDatePicker);
    }
  };

  let handelDateClick = () => {
    props.dateShow(!showDatePicker);
    setShowDatePicker(!showDatePicker);
  };

  return (
    <div>
      <TabHeader id="tabHeader">
        <TabLabelItem
          style={{ background: "#19469A", color: "white" }}
          onClick={handelDateClick}
        >
          User Date Input
        </TabLabelItem>
        {headers &&
          headers.map((header, index) => {
            return (
              <TabLabelItem
                style={{ background: "#ffffff", color: "white" }}
                key={header}
                onClick={changeTab(index)}
                selected={selectedTab === index}
                id="tabLabelItem"
              >
                {header}
              </TabLabelItem>
            );
          })}
      </TabHeader>
      <TabBody id="tabBody" onClick={handelTabBodyClick}>
        {props.children && props.children[selectedTab]}
      </TabBody>
    </div>
  );
};

export default Tabs;
