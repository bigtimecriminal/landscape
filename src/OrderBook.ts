interface Order {
  direction: "buy" | "sell";
  quantity: number;
  orderType: "limit" | "fill_and_stop";
  limitPrice: number;
}

interface Transaction {
  quantity: number;
  price: number;
}

class OrderBook {
  totalExecuted: number = 0;
  pendingBuys: Order[] = [];
  pendingSells: Order[] = [];
  transactionHistory: Transaction[] = [];

  constructor() {
  }

  _canBeFulfilled(incoming: Order, existing: Order): boolean {
    let toRet = false;

    // price check
    if (incoming.direction === "buy") {
      toRet = incoming.limitPrice >= existing.limitPrice;
    }
    else {
      toRet = existing.limitPrice >= incoming.limitPrice;
    }

    if (!toRet) {
      return false;
    }

    // quantity check
    return false;
  }

  processOrder(incoming: Order) {
    if (incoming.direction === "buy") {
      this.pendingSells.forEach((existing) => {
        if (this._canBeFulfilled(incoming, existing)) {
          // reduce the quantity of both order my the min of their quantities
          const minQuantity = Math.min(incoming.quantity, existing.quantity);
          incoming.quantity -= minQuantity;
          existing.quantity -= minQuantity;
          // add this min to totalExecuted
          this.totalExecuted += minQuantity;
          // store quantity + transaction price in a TransactionHistoryEntry
          this.transactionHistory.push({
            quantity: minQuantity,
            price: Math.min(incoming.limitPrice, existing.limitPrice)
          });
          // if either order is reduced to 0 quantity, remove
          if (incoming.quantity === 0) {
            // exit iterating
          }
          if (existing.quantity === 0) {
            // remove from queue
          }
        }
      });
      // if incoming order orderType !== "fill_and_stop", push to approp queue
    }
  }
}
