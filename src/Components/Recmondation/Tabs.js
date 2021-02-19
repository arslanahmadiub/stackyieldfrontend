import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import { tabAction } from "../../action/tabAction";
import { useDispatch, useSelector } from "react-redux";
import { changeTabAction } from "../../action/tabAction";

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
    color: "#19469A";
    padding: 0px 20px;
border-bottom:${(props) => (props.selected ? "2px solid #19469A" : "")};
    @media (max-width: 960px){
        font-size: 16px;
    }
`;

const TabBody = Styled.div`
    position: relative;
    top: 25px;

`;

const Tabs = (props) => {
  const dispatch = useDispatch();
  const tabName = useSelector((state) => state.tab.tabNumber);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const tabNumberGet = useSelector((state) => state.tab.newTabNumber);

  useEffect(() => {
    if (tabNumberGet !== null && tabNumberGet === 0) {
      setSelectedTab(0);
      dispatch(tabAction("Crypto"));

      setTimeout(() => {
        dispatch(changeTabAction(null));
      }, 500);
    }
  }, [tabNumberGet]);

  const headers = props.headers;
  const changeTab = (index, h) => (event) => {
    props.dateShow(false);
    setShowDatePicker(false);
    setSelectedTab(index);
    dispatch(tabAction(h));
  };

  useEffect(() => {
    dispatch(tabAction(headers[0]));
  }, []);

  let handelTabBodyClick = () => {
    if (showDatePicker) {
      setShowDatePicker(false);
      props.dateShow(!showDatePicker);
    }
  };

  let handelDateClick = () => {
    if (tabName === "Crypto") {
      props.dateShow(!showDatePicker);
      setShowDatePicker(!showDatePicker);
    }
  };

  return (
    <div>
      <TabHeader id="tabHeader">
        <TabLabelItem
          style={{
            background: "#19469A",
            color: "white",
          }}
          onClick={handelDateClick}
        >
          {tabName === "Crypto" ? "User Date Input" : "Recommended Crypto"}
        </TabLabelItem>
        {headers &&
          headers.map((header, index) => {
            return (
              <TabLabelItem
                style={{ color: "#19469A" }}
                key={header}
                onClick={changeTab(index, header)}
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
