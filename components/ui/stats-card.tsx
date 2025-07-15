import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from './card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, color = 'blue', className }: StatsCardProps) {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    red: 'text-red-600'
  };

  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className={cn('text-2xl font-bold', colorClasses[color])}>{value}</p>
            {trend && (
              <p className={cn('text-xs mt-1', trend.isPositive ? 'text-green-600' : 'text-red-600')}>
                {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}% from last month
              </p>
            )}
          </div>
          <Icon className={cn('w-8 h-8', colorClasses[color])} />
        </div>
      </CardContent>
    </Card>
  );
}