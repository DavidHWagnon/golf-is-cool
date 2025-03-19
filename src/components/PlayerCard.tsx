import { Box, Card, CardContent, Typography, Paper } from "@mui/material";
import Image from "next/image";
import React from 'react';
import { Player } from '@/app/lib/definitions';

const PlayerCard = ({ player }: { player: Player }) => {

  return (
    <Card 
      sx={{ 
        maxWidth: 400, 
        marginTop: '3rem',
        marginRight: 'auto',
        marginLeft: 'auto',
        backgroundImage: 'linear-gradient(rgba(93, 135, 161, 0.9), #c0def0)',
        borderRadius: 2,
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        border: '2px solid rgb(23, 41, 52)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}>
          {/* Player Name */}
          <Box sx={{ width: '90%'}}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontFamily: 'Playfair Display, serif',
                fontWeight: 'bold',
                color: '#ffffff',
                textAlign: 'center',
                backgroundColor: 'rgba(180, 204, 149, 0.8)',
                borderTop: '1px solid rgb(23, 41, 52)',
                borderBottom: '2px solid rgb(23, 41, 52)',
                borderLeft: '1px solid rgb(23, 41, 52)',
                borderRight: '1px solid rgb(23, 41, 52)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              {player.FirstName} {player.LastName}
            </Typography>
          </Box>
          <Box sx={{ width: '90%', borderBottom: '2px solid black'}}>
            <Image
                src="/cool-golf.png"
                alt="cool gold dudes"
                width={327.9}
                height={300}
                priority
                style={{ 
                  border: '1px solid rgb(23, 41, 52)',
                  borderRadius: '10px',
                  boxShadow: '10px',
                  margin: 'auto',
                  marginBottom: '1rem'
                }}
            />
          </Box>

          {/* Stats Grid */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: 2,
            width: '100%',
          }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                textAlign: 'center',
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid #e89719'
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">World Rank</Typography>
              <Typography variant="h6">{player.Weight}</Typography>
            </Paper>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                textAlign: 'center',
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid #e89719'
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">Pro Debut</Typography>
              <Typography variant="h6">{player.PgaDebut}</Typography>
            </Paper>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                textAlign: 'center',
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid #e89719'
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">College</Typography>
              <Typography variant="h6">{player.College}</Typography>
            </Paper>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                textAlign: 'center',
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid #e89719'
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">Swings</Typography>
              <Typography variant="h6">{player.Swings}</Typography>
            </Paper>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PlayerCard;
