import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'green' | 'yellow' | 'blue' | 'red' | 'purple' | 'orange' | 'gray';
}

export function StatsCard({ title, value, icon: Icon, trend, color = 'green' }: StatsCardProps) {
  const colorClasses = {
    green: {
      icon: 'text-inms-primary',
      iconBg: 'bg-inms-light',
      value: 'text-inms-primary',
      trend: 'text-inms-primary'
    },
    yellow: {
      icon: 'text-inms-secondary',
      iconBg: 'bg-inms-yellow-light',
      value: 'text-inms-secondary',
      trend: 'text-inms-secondary'
    },
    blue: {
      icon: 'text-blue-600',
      iconBg: 'bg-blue-100',
      value: 'text-blue-600',
      trend: 'text-blue-600'
    },
    red: {
      icon: 'text-red-600',
      iconBg: 'bg-red-100',
      value: 'text-red-600',
      trend: 'text-red-600'
    },
    purple: {
      icon: 'text-purple-600',
      iconBg: 'bg-purple-100',
      value: 'text-purple-600',
      trend: 'text-purple-600'
    },
    orange: {
      icon: 'text-orange-600',
      iconBg: 'bg-orange-100',
      value: 'text-orange-600',
      trend: 'text-orange-600'
    },
    gray: {
      icon: 'text-gray-600',
      iconBg: 'bg-gray-100',
      value: 'text-gray-600',
      trend: 'text-gray-600'
    }
  };

  const colors = colorClasses[color];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className={`text-2xl font-bold ${colors.value}`}>{value}</p>
            {trend && (
              <div className="flex items-center mt-2">
                {trend.isPositive ? (
                  <TrendingUp className={`w-4 h-4 mr-1 ${colors.trend}`} />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1 text-red-500" />
                )}
                <Badge 
                  variant="outline" 
                  className={`text-xs ${trend.isPositive ? colors.trend : 'text-red-500'}`}
                >
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </Badge>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colors.iconBg}`}>
            <Icon className={`w-8 h-8 ${colors.icon}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}