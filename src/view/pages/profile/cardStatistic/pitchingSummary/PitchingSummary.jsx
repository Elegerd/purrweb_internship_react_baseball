import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPitchingSummaryData } from "@ducks/pitchingSummary/routines";
import {
  getPitchingSummary,
  getPitchingSummaryIsLoading,
} from "@ducks/pitchingSummary/selector";
import { pitchingSummaryHeader } from "@constants";
import Spinner from "@commonComponents/spinner/Spinner";
import PitchingSummaryRow from "./pitchingSummaryRow/PitchingSummaryRow";
import PropTypes from "prop-types";
import "./pitchingSummary.css";

const renderRows = (items) => {
  const filteredItems = items.filter((item) => item.pitch_type);
  return filteredItems.length ? (
    filteredItems.map((item, index) => (
      <PitchingSummaryRow key={index} item={item} />
    ))
  ) : (
    <div className="summary__row-empty">
      <div>{"There's no info yet!"}</div>
    </div>
  );
};

const renderHeader = () => (
  <div className="c-table__header">
    <div className="ss-table__header summary-pitching__header">
      {pitchingSummaryHeader.map((item, index) => (
        <div key={index} className="summary-pitching__header-item">
          {item}
        </div>
      ))}
    </div>
  </div>
);

const PitchingSummary = () => {
  const dispatch = useDispatch();
  const pitchingSummary = useSelector(getPitchingSummary);
  const isLoadingPitchingSummary = useSelector(getPitchingSummaryIsLoading);

  useEffect(() => {
    dispatch(fetchPitchingSummaryData({}));
  }, []);

  if (isLoadingPitchingSummary)
    return (
      <div className="summary__empty">
        <Spinner />
      </div>
    );

  return (
    <>
      {pitchingSummary &&
      (pitchingSummary.top_values.length ||
        pitchingSummary.average_values.length) ? (
        <div className="summary__wrapper">
          <div className="summary-top">
            <div className="summary-top__title">Top Pitching Values</div>
            <div className="ss-table c-table">
              <div className="c-table__header">{renderHeader()}</div>
              <div className="c-table__content">
                {renderRows(pitchingSummary.top_values)}
              </div>
            </div>
          </div>
          <div className="summary-average">
            <div className="summary-average__title">
              Average Pitching Values
            </div>
            <div className="ss-table c-table">{renderHeader()}</div>
            <div className="c-table__content">
              {renderRows(pitchingSummary.average_values)}
            </div>
          </div>
        </div>
      ) : (
        <div className="summary__empty">{"There's no info yet!"}</div>
      )}
    </>
  );
};

PitchingSummary.propTypes = {
  type: PropTypes.string,
};

export default PitchingSummary;
