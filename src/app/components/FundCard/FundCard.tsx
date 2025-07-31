import { isNegativeNumber } from '@/lib/utils';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york-v4/ui/tooltip';
import { TriangleDownIcon, TriangleUpIcon } from '@radix-ui/react-icons';

import { InfoIcon } from 'lucide-react';

const FundCard = ({
  percentage,
  percentageChange,
  type
}: {
  percentage: string;
  percentageChange: string;
  type: 'IRR' | 'Collection';
}) => {
  return (
    <Card className='relative h-full w-full'>
      <div className='absolute top-2 right-2 cursor-pointer'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost' size='icon' className='hover:cursor-pointer'>
              <InfoIcon />
              <span className='sr-only'>Info</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {type === 'IRR' ? (
              <p>
                Internal Rate of Return (IRR) is a measure of the profitability of potential investments. It is the
                discount rate that makes the net present value (NPV) of all cash flows from a particular project equal
                to zero.
              </p>
            ) : (
              <p>
                Collection Rate is the percentage of the total amount due that has been collected. It is a key
                performance indicator for assessing the efficiency of a fund's collection process.
              </p>
            )}
          </TooltipContent>
        </Tooltip>
      </div>
      <CardHeader>
        <CardDescription className='lg:text-sm sm:text-xs'>{type === 'IRR' ? 'IRR' : 'Collection rate'} (WMA)</CardDescription>
        <CardTitle className='lg:text-xl sm:text-sm'>{percentage}</CardTitle>
        <CardDescription className='flex items-center gap-1'>
          {isNegativeNumber(percentageChange) ? (
            <TriangleDownIcon color='#0078FA' width={20} height={20} />
          ) : (
            <TriangleUpIcon color='#0078FA' width={20} height={20} />
          )}
          <span className='font-semibold text-[#0078FA] lg:text-sm sm:text-[8px]'>{percentageChange}</span>
          <span className='lg:text-sm sm:text-[8px]'>Last 30 days</span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default FundCard;
