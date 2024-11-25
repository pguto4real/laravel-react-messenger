import React from "react";

const EventBusContext = React.createContext();

export const EventBusProvider = ({ children }) => {
    const [events, setEvents] = React.useState({});

    const emit = (name, data) => {
        if (events[name]) {
            for (let cb of events[name]) {
                cb(data);
            }
        }
    };

    const on = (name, cd) => {
        if (!events[name]) {
            events[name] = [];
        }
        events[name].push(cd);

        return () => {
            events[name] = events[name].filter((callback) => callback !== cd);
        };
    };

    return (
        <EventBusContext.Provider value={{ emit, on }}>
            {children}
        </EventBusContext.Provider>
    );
};

export const useEventBus = () => {
    return React.useContext(EventBusContext);
};
