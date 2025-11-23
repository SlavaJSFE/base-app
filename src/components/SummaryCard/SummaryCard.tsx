import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';

export type SummaryCardProps = {
  title: string;
  contentClasses?: string;
  children: React.ReactNode | string;
};

export default function SummaryCard({ title, contentClasses, children }: SummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className={contentClasses}>{children}</CardContent>
    </Card>
  );
}
