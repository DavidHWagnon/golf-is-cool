'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { LayoutRouter } from 'next/dist/server/app-render/entry-base';
import { Box, Card, Container } from '@mui/material';
import PlayerCard from '@/components/PlayerCard';
import { Player } from '@/app/lib/definitions';
import Link from 'next/link';

export default function PlayerPage() {

  const params = useParams();
  const playerId = params.id;
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await fetch(`/api/golf/player/${playerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch player details');
        }
        const data = await response.json();
        setPlayer(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerDetails();
  }, [playerId]);

  if (loading) return <div>Loading player details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!player) return <div>No player found</div>;

  return (
    <Container>
      <Link href='/rankings'>Back to Rankings</Link>
      <Box>
        <PlayerCard player={player} />
      </Box>
    </Container>
  );
} 