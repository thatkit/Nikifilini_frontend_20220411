import { makeAutoObservable } from "mobx";
import { SingleOrder } from "~/screens/Orders/Show/types";
import client from "api/gql";
import { ORDER_QUERY } from "./queries";

export default class OrdersShowStore {
  initialized = false;
  loading = false;
  order: SingleOrder | null = null;
  id: string | null = null;

  setInitialized(val: boolean) {
    this.initialized = val;
  }

  constructor() {
    makeAutoObservable(this);
  }

  setOrderId(id: string): void {
    this.id = id;
  }

  async loadOrder() {
    this.loading = true;
    const result = await client
      .query(ORDER_QUERY, { number: this.id })
      .toPromise();
    this.loading = false;
    this.order = await result.data.order;
  }

  initialize() {
    if (this.initialized) return;
    this.initialized = true;
    this.loadOrder();
  }
}
