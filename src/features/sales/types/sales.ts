export type SalesRecord = {
  date: string;
  channel_type: string;
  channel_name: string;
  order_status_id: number;
  sum_sales: number;
  count_orders: number;
};

export type ChannelTypeSalesRecord = {
  channel_type: string;
  sales: number;
};

export type ChannelNameSalesRecord = {
  channel_name: string;
  sales: number;
};
