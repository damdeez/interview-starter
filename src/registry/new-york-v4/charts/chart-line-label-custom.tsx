'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/registry/new-york-v4/ui/chart';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, LabelList, Line, LineChart } from 'recharts';

export const description = 'A line chart with a custom label';

const chartData = [
    { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
    { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
    { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
    { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
    { browser: 'other', visitors: 90, fill: 'var(--color-other)' }
];

const chartConfig = {
    visitors: {
        label: 'Visitors',
        color: 'var(--chart-2)'
    },
    chrome: {
        label: 'Chrome',
        color: 'var(--chart-1)'
    },
    safari: {
        label: 'Safari',
        color: 'var(--chart-2)'
    },
    firefox: {
        label: 'Firefox',
        color: 'var(--chart-3)'
    },
    edge: {
        label: 'Edge',
        color: 'var(--chart-4)'
    },
    other: {
        label: 'Other',
        color: 'var(--chart-5)'
    }
} satisfies ChartConfig;

export function ChartLineLabelCustom() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Line Chart - Custom Label</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 24,
                            left: 24,
                            right: 24
                        }}>
                        <CartesianGrid vertical={false} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator='line' nameKey='visitors' hideLabel />}
                        />
                        <Line
                            dataKey='visitors'
                            type='natural'
                            stroke='var(--color-visitors)'
                            strokeWidth={2}
                            dot={{
                                fill: 'var(--color-visitors)'
                            }}
                            activeDot={{
                                r: 6
                            }}>
                            <LabelList
                                position='top'
                                offset={12}
                                className='fill-foreground'
                                fontSize={12}
                                dataKey='browser'
                                formatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className='flex-col items-start gap-2 text-sm'>
                <div className='flex gap-2 leading-none font-medium'>
                    Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
                </div>
                <div className='text-muted-foreground leading-none'>Showing total visitors for the last 6 months</div>
            </CardFooter>
        </Card>
    );
}
