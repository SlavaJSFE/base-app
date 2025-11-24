import { Card, CardHeader, CardTitle, CardContent } from '@ui/card';

export default function AboutPage() {
  return (
    <Card className="max-w-3xl mx-auto my-8">
      <CardHeader>
        <CardTitle>About This Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-relaxed">
        <p>
          This dashboard is a demonstration project built to visualize sales data from multiple
          e‑commerce channels. The dataset comes from a prepared JSON file used in a recruitment
          task, containing information about orders, revenues, and statuses across platforms such as
          Allegro, Shoper, Shopify, Presta, and eBay.
        </p>
        <p>
          The charts and summaries help to quickly understand key metrics:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Total sales and total orders</li>
            <li>Average order value</li>
            <li>Best performing day</li>
            <li>Sales distribution by channel type and channel name</li>
          </ul>
        </p>
        <p>
          The goal of this page is to showcase how raw transactional data can be transformed into
          clear, interactive visualizations. It highlights trends, compares performance between
          channels, and provides insights that are useful for decision‑making in online retail.
        </p>
        <p className="text-muted-foreground">
          Note: The dataset is synthetic and intended for demonstration purposes only.
        </p>
      </CardContent>
    </Card>
  );
}
