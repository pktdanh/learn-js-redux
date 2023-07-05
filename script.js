// import { createStore } from "https://cdn.skypack.dev/redux";

// ---------------------------- MY REDUX --------------------------------

const createStore = (reducer) => {
    let state = reducer(undefined, {});
    const subscribers = [];
    console.log(state);
    return {
        getState() {
            return state;
        },
        dispatch(action) {
            state = reducer(state, action);
            subscribers.forEach((action) => action());
        },
        subscribe(subscriber) {
            subscribers.push(subscriber);
        },
    };
};

// ---------------------------- MY APP --------------------------------
const initState = 0;

// Reducer
function reducer(state = initState, action) {
    switch (action.type) {
        case "DEPOSIT":
            return state + action.payload;
        case "WITHDRAW":
            return state - action.payload;
        default:
            return state;
    }
}

// Store
const store = (window.store = createStore(reducer));
console.log(store);

// Action
const actionDeposit = (payload) => {
    return {
        type: "DEPOSIT",
        payload: payload,
    };
};
const actionWithdraw = (payload) => {
    return {
        type: "WITHDRAW",
        payload: payload,
    };
};

// DOM elements
const deposit = document.getElementById("deposit");
const withdraw = document.getElementById("withdraw");

// DOM events
deposit.addEventListener("click", () => {
    store.dispatch(actionDeposit(10));
});

withdraw.addEventListener("click", () => {
    store.dispatch(actionWithdraw(10));
});

// Listener
store.subscribe(render);
store.subscribe(() => console.log("Action"));
store.subscribe(() => console.log("Action 2"));
store.subscribe(() => console.log("Action 3"));

function render() {
    const output = document.getElementById("output");
    output.innerText = store.getState();
}

render();
