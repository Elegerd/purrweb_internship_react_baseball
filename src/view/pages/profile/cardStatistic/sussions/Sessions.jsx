import React, { useState } from "react";
import CustomDatePicker from "@commonComponents/customDatePicker/CustomDatePicker";
import { ReactComponent as Calendar } from "@assets/svg/calendar.svg";
import { ReactComponent as Arrow } from "@assets/svg/arrow2.svg";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem } from "rc-menu";
import "./sessions.css";

const Sessions = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const menuTypeItems = [
    <MenuItem className="dropdown-panel__item" key="None">
      None
    </MenuItem>,
    <MenuItem className="dropdown-panel__item" key="Game">
      Game
    </MenuItem>,
    <MenuItem className="dropdown-panel__item" key="Practice">
      Practice
    </MenuItem>,
  ];

  const handleOnClickItem = (e) => {
    setSelectedItem(e.key !== "None" ? e.key : null);
  };

  const menuType = (
    <Menu
      selectable={false}
      onClick={handleOnClickItem}
      className="dropdown-panel dropdown-statistic"
    >
      {menuTypeItems}
    </Menu>
  );

  return (
    <div className="statistic-sessions">
      <div className="statistic-sessions__header">
        <div className="statistic-sessions__title">Sessions</div>
        <div className="statistic-sessions__actions">
          <div className="ss-actions__clear">
            <button>Clear Filters</button>
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
            <Dropdown trigger={["click"]} overlay={menuType}>
              <button>
                Type {selectedItem ? `(${selectedItem})` : null}
                <span className="ss-actions__arrow">
                  <Arrow />
                </span>
              </button>
            </Dropdown>
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
          {true ? "The player haven't had any sessions yet!" : null}
        </div>
      </div>
    </div>
  );
};

export default Sessions;
