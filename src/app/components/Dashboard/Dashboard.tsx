'use client';

import { ECurrencies } from '@/constants/constants';
import useFundPerformance from '@/hooks/useFundPerformance';
import { convertStringToPercentage, percentageChange, thirtyDaysAgo } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/registry/new-york-v4/ui/alert';
import { Card, CardHeader } from '@/registry/new-york-v4/ui/card';
import { Skeleton } from '@/registry/new-york-v4/ui/skeleton';

import Chart from '../Chart/Chart';
import FundCard from '../FundCard/FundCard';
import { AlertCircleIcon } from 'lucide-react';

const Dashboard = ({ selectedCurrency }: { selectedCurrency: ECurrencies }) => {
  const { performanceData, loading, error } = useFundPerformance(0, selectedCurrency);
  const { performanceData: performanceData30DaysAgo } = useFundPerformance(thirtyDaysAgo, selectedCurrency);

  if (loading) {
    return (
      <main className='min-h-screen bg-[#F8F9FE] p-[16px] dark:bg-[#1A1C1E]'>
        <div className='mb-4 flex flex-row items-center gap-3'>
          <Card className='w-full'>
            <CardHeader>
              <Skeleton className='h-4 w-[150px]' />
              <Skeleton className='h-4 w-2/3' />
              <Skeleton className='h-4 w-1/2' />
            </CardHeader>
          </Card>
          <Card className='w-full'>
            <CardHeader>
              <Skeleton className='h-4 w-[150px]' />
              <Skeleton className='h-4 w-2/3' />
              <Skeleton className='h-4 w-1/2' />
            </CardHeader>
          </Card>
        </div>
        <Card className='w-full'>
          <CardHeader>
            <Skeleton className='h-4 w-[150px]' />
            <Skeleton className='h-4 w-2/3' />
            <Skeleton className='h-4 w-1/2' />
          </CardHeader>
        </Card>
      </main>
    );
  } else if (error) {
    return (
      <main className='min-h-screen bg-[#F8F9FE] p-[16px] dark:bg-[#1A1C1E]'>
        <Alert variant='destructive'>
          <AlertCircleIcon />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>Please try refreshing the page</AlertDescription>
        </Alert>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-[#F8F9FE] p-[16px] dark:bg-[#1A1C1E]'>
      <div className='mb-4 flex flex-row items-center gap-3'>
        {performanceData?.irr && performanceData30DaysAgo?.irr && (
          <FundCard
            percentage={convertStringToPercentage(performanceData?.irr)}
            percentageChange={percentageChange(performanceData?.irr, performanceData30DaysAgo?.irr)}
            type='IRR'
          />
        )}
        {performanceData?.collection_rate && performanceData30DaysAgo?.collection_rate && (
          <FundCard
            percentage={convertStringToPercentage(performanceData?.collection_rate)}
            percentageChange={percentageChange(
              performanceData?.collection_rate,
              performanceData30DaysAgo?.collection_rate
            )}
            type='Collection'
          />
        )}
      </div>

      <Chart />
    </main>
  );
};

export default Dashboard;
