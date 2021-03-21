import React, { useState } from "react";
import PropTypes from "prop-types";
import dateformat from "dateformat";

function FilterByDate({ filter, cancel }) {
    const Format = dateformat(new Date(), "yyyy-mm-dd")
    const [startDate, setStartDate] = useState(Format);
    const [Enddate, setEndDate] = useState(Format);

    const FilterItems = () => {
        // filter function 
        const sDate = new Date(startDate).getTime()
        const EDate = new Date(Enddate).getTime()
        filter(sDate, EDate)
        cancel()
    };
    return (
        <div className="add-item-form">
            <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    onChange={e => setStartDate(e.target.value)}
                    value={startDate}
                />
            </div>
            <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    onChange={e => setEndDate(e.target.value)}
                    value={Enddate}
                />
            </div>
            <button className="btn btn-success" onClick={FilterItems} disabled={startDate === '' && Enddate === ''}>
                filter
            </button>
            <button className="btn btn-secondary" style={{ marginLeft: "20px" }} onClick={cancel}>
                Cancel
            </button>
        </div>
    );
}

FilterByDate.propTypes = {
    filter: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
};

export default FilterByDate;
