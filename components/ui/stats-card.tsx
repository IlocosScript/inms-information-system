import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'red' | 'orange';
}

export function StatsCard({ title, value, icon: Icon, trend, color = 'blue' }: StatsCardProps) {
  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600';
      case 'green': return 'text-green-600';
      case 'yellow': return 'text-yellow-600';
      case 'purple': return 'text-purple-600';
      case 'red': return 'text-red-600';
      case 'orange': return 'text-orange-600';
      default: return 'text-blue-600';
    }
  };

  const getValueColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600';
      case 'green': return 'text-green-600';
      case 'yellow': return 'text-yellow-600';
      case 'purple': return 'text-purple-600';
      case 'red': return 'text-red-600';
      case 'orange': return 'text-orange-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-2xl font-bold ${getValueColor(color)}`}>
              {value}
            </p>
            {trend && (
              <div className="flex items-center mt-1">
                {trend.isPositive ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.value}%
                </span>
              </div>
            )}
          </div>
          <Icon className={`w-8 h-8 ${getIconColor(color)}`} />
        </div>
      </CardContent>
    </Card>
  );
}