import React, { useEffect } from "react";
import OrdersShowStore from "./store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import styles from "./styles.m.styl";
import { map } from "lodash";

import Item from "./components/Item/index"
import DeliveryType from "~/components/DeliveryType";
import OrderStatus from "~/components/OrderStatus";
import { SingleOrderItem } from "./types";

type ShowParams = {
  id: string;
};

const OrdersShow = observer(
  (): JSX.Element => {
    const [state] = React.useState(new OrdersShowStore());

    const params: ShowParams = useParams();

    useEffect(() => {
      if (state.initialized) return;
      state.setOrderId(params.id);
      state.initialize();
    });

    return (
      <div className={styles.screenWrapper}>
        <div className={styles.screen}>
          {state.loading && <span>Loading...</span>}
          {!state.loading && (
            <div>
              <div className={styles.row}>
                <div className={styles.orderNumber}>{state?.order?.number}</div>
                <div title={state?.order?.delivery?.code}>
                  <DeliveryType code={state?.order?.delivery?.code || ''} />
                </div>
                <div title={state?.order?.status}>
                  <OrderStatus code={state?.order?.status || ''} />
                </div>
              </div>
              <div className={styles.items}>
                {map(state?.order?.items, (item: SingleOrderItem, index: number) => (
                  <Item item={item} key={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default OrdersShow;
