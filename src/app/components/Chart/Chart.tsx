'use client';

import { useState } from 'react';

import { DPD } from '@/constants/constants';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/registry/new-york-v4/ui/navigation-menu';
import { Tooltip as RedixTooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york-v4/ui/tooltip';

import { InfoIcon } from 'lucide-react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Type definitions
interface DPDBreakdown {
  '0': number;
  '1-6': number;
  '7-29': number;
  '30-59': number;
  '60-89': number;
  '90-119': number;
}

interface ChartDataPoint {
  daysSinceOrigination: number;
  Jan: number;
  Feb: number;
  Mar: number;
  Apr: number;
  May: number;
  Jun: number;
  Jul: number;
  Aug: number;
  Sep: number;
  Oct: number;
  Nov: number;
  Dec: number;
  dpdBreakdown: DPDBreakdown;
  totalValue: number;
}

interface TooltipPayload {
  color: string;
  dataKey: string;
  fill: string;
  formatter: undefined;
  name: string;
  payload: ChartDataPoint;
  stroke: string;
  strokeWidth: number;
  type: string;
  unit: undefined;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
}

// Sample data structure - what I think it might look like based on the designs
const data = [
  {
    daysSinceOrigination: 30,
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
    // DPD breakdown data for tooltip
    dpdBreakdown: { '0': 74.4, '1-6': 14.2, '7-29': 3.1, '30-59': 4.4, '60-89': 2.9, '90-119': 1.0 },
    totalValue: 1490984
  },
  {
    daysSinceOrigination: 40,
    Jan: 3.15,
    Feb: 3.1,
    Mar: 3.0,
    Apr: 2.9,
    May: 2.7,
    Jun: 2.5,
    Jul: 2.4,
    Aug: 2.3,
    Sep: 2.2,
    Oct: 2.1,
    Nov: 2,
    Dec: 1,
    dpdBreakdown: { '0': 72.1, '1-6': 15.3, '7-29': 4.2, '30-59': 5.1, '60-89': 2.3, '90-119': 1.0 },
    totalValue: 1580315
  },
  {
    daysSinceOrigination: 50,
    Jan: 3.7,
    Feb: 3.6,
    Mar: 3.5,
    Apr: 3.5,
    May: 3.4,
    Jun: 3.2,
    Jul: 3.1,
    Aug: 2.9,
    Sep: 2.7,
    Oct: 2.5,
    Nov: 2.2,
    Dec: 2,
    dpdBreakdown: { '0': 70.8, '1-6': 16.1, '7-29': 5.1, '30-59': 4.8, '60-89': 2.2, '90-119': 1.0 },
    totalValue: 1605412
  },
  {
    daysSinceOrigination: 58,
    Jan: 4.7,
    Feb: 4.6,
    Mar: 4.5,
    Apr: 4.5,
    May: 4.4,
    Jun: 4.2,
    Jul: 4.1,
    Aug: 4.0,
    Sep: 3.4,
    Oct: 3.2,
    Nov: 3,
    Dec: 2.9,
    dpdBreakdown: { '0': 74.4, '1-6': 14.2, '7-29': 3.1, '30-59': 4.4, '60-89': 8.9, '90-119': 3.4 },
    totalValue: 1703541
  },
  {
    daysSinceOrigination: 70,
    Jan: 5.9,
    Feb: 5.7,
    Mar: 5.5,
    Apr: 5.4,
    May: 5.3,
    Jun: 5.1,
    Jul: 4.9,
    Aug: 4.5,
    Sep: 4.5,
    Oct: 3.9,
    Nov: 3.7,
    Dec: 3.5,
    dpdBreakdown: { '0': 68.5, '1-6': 17.2, '7-29': 6.1, '30-59': 4.9, '60-89': 2.3, '90-119': 1.0 },
    totalValue: 1800984
  },
  {
    daysSinceOrigination: 80,
    Jan: 8.8,
    Feb: 8.5,
    Mar: 8.2,
    Apr: 8,
    May: 7.9,
    Jun: 7.5,
    Jul: 7.1,
    Aug: 6.9,
    Sep: 6.5,
    Oct: 5.9,
    Nov: 5.3,
    Dec: 5,
    dpdBreakdown: { '0': 66.2, '1-6': 18.3, '7-29': 7.1, '30-59': 5.2, '60-89': 2.2, '90-119': 1.0 },
    totalValue: 1900984
  },
  {
    daysSinceOrigination: 90,
    Jan: 9.9,
    Feb: 9.19,
    Mar: 9,
    Apr: 8.9,
    May: 8.5,
    Jun: 8.1,
    Jul: 7.9,
    Aug: 7.6,
    Sep: 7.4,
    Oct: 7,
    Nov: 6.4,
    Dec: 6,
    dpdBreakdown: { '0': 64.1, '1-6': 19.1, '7-29': 8.2, '30-59': 5.4, '60-89': 2.2, '90-119': 1.0 },
    totalValue: 1980984
  },
  {
    daysSinceOrigination: 100,
    Jan: 11.5,
    Feb: 11,
    Mar: 10.5,
    Apr: 10.2,
    May: 9.9,
    Jun: 9.6,
    Jul: 9.1,
    Aug: 8.9,
    Sep: 8.5,
    Oct: 8.1,
    Nov: 7.2,
    Dec: 6.8,
    dpdBreakdown: { '0': 62.3, '1-6': 19.8, '7-29': 9.1, '30-59': 5.6, '60-89': 2.2, '90-119': 1.0 },
    totalValue: 2010984
  },
  {
    daysSinceOrigination: 120,
    Jan: 12.59,
    Feb: 12.25,
    Mar: 12,
    Apr: 11.5,
    May: 10.9,
    Jun: 10.6,
    Jul: 9.99,
    Aug: 9.6,
    Sep: 9.1,
    Oct: 8.5,
    Nov: 7.9,
    Dec: 7.5,
    dpdBreakdown: { '0': 58.7, '1-6': 21.2, '7-29': 11.1, '30-59': 6.1, '60-89': 2.1, '90-119': 0.8 },
    totalValue: 2090841
  },
  {
    daysSinceOrigination: 140,
    Jan: 13,
    Feb: 12.99,
    Mar: 12.9,
    Apr: 12.5,
    May: 12.2,
    Jun: 11.9,
    Jul: 11.5,
    Aug: 10.9,
    Sep: 10.2,
    Oct: 9.5,
    Nov: 8.7,
    Dec: 8,
    dpdBreakdown: { '0': 55.1, '1-6': 22.6, '7-29': 13.1, '30-59': 6.6, '60-89': 2.0, '90-119': 0.6 },
    totalValue: 2290871
  },
  {
    daysSinceOrigination: 150,
    Jan: 13.5,
    Feb: 13.1,
    Mar: 12.99,
    Apr: 12.7,
    May: 12.5,
    Jun: 12.1,
    Jul: 11.9,
    Aug: 10.5,
    Sep: 10,
    Oct: 9.5,
    Nov: 8.9,
    Dec: 8.4,
    dpdBreakdown: { '0': 52.3, '1-6': 23.9, '7-29': 14.8, '30-59': 7.1, '60-89': 1.3, '90-119': 0.6 },
    totalValue: 2490984
  }
];

// Colors matching your chart
const monthColors = {
  Jan: '#5357CD',
  Feb: '#ff7f0e',
  Mar: '#2ca02c',
  Apr: '#d62728',
  May: '#9467bd',
  Jun: '#8c564b',
  Jul: '#e377c2',
  Aug: '#7f7f7f',
  Sep: '#bcbd22',
  Oct: '#17becf',
  Nov: '#aec7e8',
  Dec: '#98df8a'
};

// DPD bucket colors for tooltip
const dpdBucketColors = {
  '0': '#4285f4',
  '1-6': '#fbbc04',
  '7-29': '#34a853',
  '30-59': '#ea4335',
  '60-89': '#9c27b0',
  '90-119': '#795548'
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;

    return (
      <Card className='w-64'>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm font-semibold'>{label} Days from Origination</CardTitle>
        </CardHeader>
        <CardContent className='pt-0'>
          <div className='space-y-2'>
            {Object.entries(data.dpdBreakdown).map(([bucket, percentage]) => (
              <div key={bucket} className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div
                    className='h-3 w-3 rounded-sm'
                    style={{
                      backgroundColor: dpdBucketColors[bucket as keyof typeof dpdBucketColors]
                    }}
                  />
                  <span className='text-muted-foreground text-sm'>{bucket}</span>
                </div>
                <span className='text-sm font-medium'>{percentage}%</span>
              </div>
            ))}
          </div>
          <div className='mt-3 border-t pt-3'>
            <div className='flex justify-between'>
              <span className='text-sm font-semibold'>Total value</span>
              <span className='text-sm font-semibold'>${data.totalValue.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

const Chart = () => {
  const [selectedDpd, setSelectedDpd] = useState(DPD[0]);
  const { width } = useWindowDimensions();

  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <CardTitle>DPD by Vintage of Origination</CardTitle>
            <RedixTooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon' className='hover:cursor-pointer'>
                  <InfoIcon />
                  <span className='sr-only'>Info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  This chart shows the DPD (Days Past Due) breakdown by vintage of origination. The data is segmented by
                  months and DPD buckets.
                </p>
              </TooltipContent>
            </RedixTooltip>
          </div>
          <NavigationMenu className={navigationMenuTriggerStyle()}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className='font-semibold text-[#0078FA] hover:cursor-pointer hover:text-[#0078FA]'>
                  {selectedDpd}+ DPD
                </NavigationMenuTrigger>
                <NavigationMenuContent className='right-auto left-0'>
                  <ul className='grid gap-2'>
                    <li>
                      {DPD.map((dpd) => (
                        <NavigationMenuLink
                          className='w-max px-8 py-2 hover:cursor-pointer'
                          key={dpd}
                          onClick={() => setSelectedDpd(dpd)}>
                          {dpd}+ DPD
                        </NavigationMenuLink>
                      ))}
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className='h-96 w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={data}
              margin={{
                top: width > 768 ? 20 : 10,
                right: width > 768 ? 60 : 30,
                left: width > 768 ? 20 : 10,
                bottom: width > 768 ? 20 : 10
              }}>
              <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
              <XAxis
                dataKey='daysSinceOrigination'
                type='number'
                scale='linear'
                domain={[30, 150]}
                tickCount={7}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
                label={{
                  value: 'Days Since Origination',
                  position: 'insideBottom',
                  offset: width > 768 ? -40 : -20,
                  className: 'text-[12px]'
                }}
              />
              <YAxis
                domain={[0, 14]}
                tickFormatter={(value) => `${value}%`}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <Tooltip content={CustomTooltip} />
              {width > 768 && (
                <Legend layout='vertical' align='left' verticalAlign='top' iconType='circle' iconSize={8} />
              )}

              {/* Create a Line component for each month */}
              {Object.entries(monthColors).map(([month, color]) => (
                <Line
                  key={month}
                  type='monotone'
                  dataKey={month}
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chart;
