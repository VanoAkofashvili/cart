const reducer = (state, action) => {
  if (action.type === "LOADING") {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === "DISPLAY_ITEMS") {
    return {
      ...state,
      loading: false,
      cart: action.payload,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const newItems = state.cart.filter((item) => item.id !== action.payload);
    return {
      ...state,
      cart: newItems,
    };
  }

  if (action.type === "INCREASE") {
    let tmpCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return {
          ...item,
          amount: item.amount + 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cart: tmpCart,
    };
  }

  if (action.type === "DECREASE") {
    let tmpCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            amount: item.amount - 1,
          };
        }
        return item;
      })
      .filter((item) => item.amount > 0);
    return {
      ...state,
      cart: tmpCart,
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (acc, item) => {
        const price = item.amount * item.price;
        acc.amount += item.amount;
        acc.total += price;
        return acc;
      },
      { total: 0, amount: 0 }
    );

    return {
      ...state,
      total: +total.toFixed(2),
      amount,
    };
  }

  return state;
};

export default reducer;
