import React from "react";
import PropTypes from "prop-types";
import dateformat from "dateformat";
import isOverdue from "./isOverdue";
import Checkbox from "./checkbox";

function Item({ item, completeItem, inCompleteItem }) {
    const itemClass = `list-group-item list-group-item-${isOverdue(item) ? "danger" : "info"}`;
    return (
        <li className={itemClass}>
            <div className="item">
                <span className={`item-title${item.complete ? " complete-item" : ""}`}>
                    <i className={isOverdue(item) ? "fas fa-exclamation-circle" : ""} />
                    {`${item.name} - ${dateformat(new Date(item.timestampDue), "dd-mmm-yyyy")}`}
                </span>
                <Checkbox
                    label="Complete item"
                    selected={item.complete}
                    select={completeItem}
                    unSelect={inCompleteItem}
                />
            </div>
        </li>
    );
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    completeItem: PropTypes.func.isRequired,
    inCompleteItem: PropTypes.func.isRequired,
};

export default Item;
