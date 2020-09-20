import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDatePicker from "@commonComponents/customDatePicker/CustomDatePicker";
import { ReactComponent as Calendar } from "@assets/svg/calendar.svg";
import { ReactComponent as Arrow } from "@assets/svg/arrow2.svg";
import ButtonDropdown from "@commonComponents/buttonDropdown/ButtonDropdown";
import Menu, { Item as MenuItem } from "rc-menu";
import { sessionTypes } from "@constants";
import { fetchProfileEventsData } from "@ducks/profileEvent/profileEventsRoutines";
import { getProfileEvents } from "@ducks/profileEvent/profileEventsSelector";
import "./sessions.css";

const Sessions = () => {
  const dispatch = useDispatch();
  const profileEvents = useSelector(getProfileEvents);
  const [selectedItem, setSelectedItem] = useState(null);
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    const date = startDate
      ? startDate.getDate() +
        "-" +
        (startDate.getMonth() + 1) +
        "-" +
        startDate.getFullYear()
      : undefined;
    const event_type = selectedItem ? selectedItem : undefined;
    dispatch(
      fetchProfileEventsData({
        date,
        event_type,
      })
    );
  }, [selectedItem, startDate]);

  const getMenuTypeItems = (items) =>
    items.map((item, index) => (
      <MenuItem className="dropdown-panel__item" data-item={item} key={index}>
        {item}
      </MenuItem>
    ));

  const handleOnClickItem = (e) => {
    setSelectedItem(
      e.item.props["data-item"] !== "None" ? e.item.props["data-item"] : null
    );
  };

  const menuType = (
    <Menu
      selectable={false}
      onClick={handleOnClickItem}
      className="dropdown-panel dropdown-statistic"
    >
      {getMenuTypeItems(sessionTypes)}
    </Menu>
  );

  const handleOnClickClear = (e) => {
    setSelectedItem(null);
    setStartDate(null);
  };

  return (
    <div className="statistic-sessions">
      <div className="statistic-sessions__header">
        <div className="statistic-sessions__title">Sessions</div>
        <div className="statistic-sessions__actions">
          <div className="ss-actions__clear">
            <button onClick={handleOnClickClear}>Clear Filters</button>
          </div>
          <div className="ss-actions__datepicker">
            <CustomDatePicker
              selected={startDate ? startDate : +new Date()}
              onChange={(date) => setStartDate(date)}
              customInput={
                <button>
                  <span className="ss-actions__calendar">
                    <Calendar />
                  </span>
                  Date
                  {startDate !== null
                    ? ` (${startDate.toLocaleDateString()})`
                    : null}
                  <span className="ss-actions__arrow">
                    <Arrow />
                  </span>
                </button>
              }
              popperPlacement="bottom-end"
            />
          </div>
          <div className="ss-actions__type">
            <ButtonDropdown
              trigger={["click"]}
              overlay={menuType}
              text={`Type ${selectedItem ? selectedItem : ""}`}
              arrowContainerClass={"ss-actions__arrow"}
            />
          </div>
        </div>
      </div>
      <div className="statistic-sessions__content">
        <div className="ss-table c-table">
          <div className="c-table__header">
            <div className="ss-table__header">
              <div className="ss-table__header-item">Date</div>
              <div className="ss-table__header-item">Type</div>
              <div className="ss-table__header-item">Name</div>
              <div className="ss-table__header-item">Purchased</div>
            </div>
          </div>
        </div>
        <div className="ss-table__content">
          {profileEvents ? "The player haven't had any sessions yet!" : null}
        </div>
      </div>
    </div>
  );
};

export default Sessions;