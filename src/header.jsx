import React, { useState } from "react";
import PropTypes from "prop-types";
import Checkbox from "./checkbox";
import NewItem from "./newItem";
import FilterByDate from "./filterByDate";

function Header({ filter, addItem, setFilter, addfilterByDate }) {
    const [adding, setAdding] = useState(false);
    const [filterByDate, setFilterByDate] = useState(false);

    // for checkbox select & unselect overdue items
    const selectOverdueFilter = () => setFilter({ ...filter, overdueOnly: true });
    const unSelectOverdueFilter = () => setFilter({ ...filter, overdueOnly: false });
    // for checkbox select & unselect compeleted items
    const selectCompleteFilter = () => setFilter({ ...filter, includeComplete: true });
    const unSelectCompleteFilter = () => setFilter({ ...filter, includeComplete: false });
    // add New Items
    const addNewItem = item => {
        console.log(item);
        setAdding(false);
        addItem(item);
    };
    const filterItems = (startDate, EndDate)  => {
        addfilterByDate(startDate, EndDate)
    };

    return (
        <header>
            <nav className="navbar navbar-light bg-light">
                <span className="navbar-brand">Todo list</span>
                <div style={{ flexDirection: "inherit", display: "flex", alignItems: "center" }}>
                    {!adding && (
                        <button type="button" className="btn btn-link" onClick={() => {
                            setAdding(true)
                            setFilterByDate(false)
                        }}>
                            Add new item
                        </button>
                    )}
                    {!filterByDate && (
                        <button type="button" className="btn btn-link" onClick={() => {
                            setAdding(false)
                            setFilterByDate(true)
                        }}>
                            Filter By Date
                        </button>
                    )}
                    <Checkbox
                        label="today & overdue items only"
                        selected={filter.overdueOnly}
                        select={selectOverdueFilter}
                        unSelect={unSelectOverdueFilter}
                    />
                    <Checkbox
                        label="Include complete items"
                        selected={filter.includeComplete}
                        select={selectCompleteFilter}
                        unSelect={unSelectCompleteFilter}
                    />
                </div>
            </nav>
            {adding && <NewItem cancel={() => setAdding(false)} add={addNewItem} />}
            {filterByDate && <FilterByDate cancel={() => setFilterByDate(false)} filter={filterItems} />}
        </header>
    );
}

Header.propTypes = {
    addItem: PropTypes.func.isRequired,
    addfilterByDate: PropTypes.func.isRequired,
    filter: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired,
};

export default Header;
