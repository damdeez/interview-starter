import { useEffect, useState } from 'react';

import { ECurrencies, FUND_ADDRESS } from '@/constants/constants';

interface IPerformanceData {
  irr: string;
  total_originated: string;
  active_principal: string;
  defaulted_principal: string;
  recovery_rate: string;
  collection_rate: string;
  principal_collection_rate: string;
}

// {
//     "irr": "0.1646",
//     "total_originated": "100292635.9800",
//     "active_principal": "70246061.3400",
//     "defaulted_principal": "10010029.3900",
//     "recovery_rate": "0.3497",
//     "collection_rate": "0.9001",
//     "principal_collection_rate": "0.8501"
// }

function useFundPerformance(timestamp?: number, currency?: ECurrencies) {
  const [performanceData, setPerformanceData] = useState<null | IPerformanceData>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  async function getPerformanceData() {
    setLoading(true);
    const url =
      `https://fe.interview.pactlabs.xyz/api/funds/${FUND_ADDRESS}/performance?currency=${currency ?? ECurrencies.USD}` +
      (timestamp ? `&as_of=${timestamp}` : '');
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setPerformanceData(json);
    } catch (error) {
      setError('Failed to fetch performance data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPerformanceData();
  }, []);

  return { performanceData, loading, error };
}

export default useFundPerformance;
