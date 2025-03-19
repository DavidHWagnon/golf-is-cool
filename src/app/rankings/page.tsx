import RankingsTable from '@/components/RankingsTable';
import { readFileSync } from 'fs';

const RankingsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Golf Rankings</h1>
      <RankingsTable />
    </div>
  );
} 

export default RankingsPage;
