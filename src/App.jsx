import React, { useEffect } from "react";
import Header from "./header";
import List from "./list";
import "./App.scss";
import isOverdue from "./isOverdue";
import todoApi from "./todoApi";
import { AppProvider } from './context';
const defaultFilter = { overdueOnly: true, includeComplete: false };

// const context = React.createContext()

function App() {
    const [items, setItems] = React.useState([]);
    const [filter, setFilter] = React.useState(defaultFilter);
    const [loading, setLoading] = React.useState(true);

    const loadItems = async () => {
        setLoading(true);
        const todoItems = await todoApi.get();
        setItems(todoItems);
        setLoading(false);
    };

    useEffect(() => {
        loadItems();
    }, []);
    // when complete a task
    const complete = async id => {
        const updatedItems = await todoApi.complete(id);
        setItems(updatedItems);
    };
    // when incomplete a task
    const inComplete = async id => {
        const updatedItems = await todoApi.inComplete(id);
        setItems(updatedItems);
    };
    // Add new item
    const add = async item => {
        const updatedItems = await todoApi.add(item);
        setItems(updatedItems);
    };
    // filter by specific date
    const filterByDate = async (startDate, EndDate) => {
        setLoading(true);
        const todoItems = await todoApi.get();
        setItems(todoItems)
        const updatedItems = todoItems.filter(
            item => startDate <= item.timestampDue && EndDate >= item.timestampDue
        )
        updatedItems.length > 0 ? setItems(updatedItems) : setItems(todoItems)
        setLoading(false);
    };


    // func to return items also works when check overdue items only
    const filteredItems = items.filter(
        item => (filter.includeComplete || !item.complete) && (!filter.overdueOnly || isOverdue(item)),
    );


    return (
        <AppProvider>
            <div className="fluid-container app-container">
                <Header addItem={add} filter={filter} setFilter={setFilter} addfilterByDate={filterByDate} />
                {!loading && (
                    <div className="list">
                        <List items={filteredItems} completeItem={complete} inCompleteItem={inComplete} />
                    </div>
                )}
                {loading && (
                    <div className="alert alert-info" role="alert">
                        Loading please wait...
                    </div>
                )}
            </div>
        </AppProvider>
    );
}

export default App;
