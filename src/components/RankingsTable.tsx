'use client';

import { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  RowSelection,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { Container, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Box } from '@mui/material';
import styles from './RankingsTable.module.css'
import { GolfRanking } from '@/app/lib/definitions';


const RankingsTable = () => {

  const router = useRouter();

  // State
  const [data, setData] = useState<GolfRanking[]>([]);
  const [year, setYear] = useState<string>('2025');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);


  // Table Header and Data values
  const columnHelper = createColumnHelper<GolfRanking>();

  const columns = [
    columnHelper.accessor('WorldGoldRank', {
      header: 'Current Rank',
      cell: props => (
        <Typography className={styles.points}>{props.row.original.WorldGoldRank}</Typography>
      ) 
    }),
    columnHelper.accessor('WorldGoldRankLastWeek', {
      header: 'Last Rank',
      cell: props => (
        <Typography className={styles.points}>{props.row.original.WorldGoldRankLastWeek}</Typography>
      ) 
    }),
    columnHelper.accessor('Name', {
        header: 'Player Name',
        cell: props => (
          <Typography className={styles.playerName}>{props.row.original.Name}</Typography>
        ) 
    }),
    columnHelper.accessor('AveragePoints', {
        header: 'Average Points',
        cell: props => (
          <Typography className={styles.points}>{props.row.original.AveragePoints}</Typography>
        ) 
    }),
    columnHelper.accessor('TotalPoints', {
        header: 'Total Points',
        cell: props => (
          <Typography className={styles.points}>{props.row.original.AveragePoints}</Typography>
        ) 
    }),
  ];

  // Handlers
  const handleClick = (PlayerID: number) => {
    console.log('Clicking player with ID:', PlayerID);
    router.push(`/player/${PlayerID}`);
  }

  const handleYearChange = (year: string) => {
    setYear(year);
    setLoading(true);
  }

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch(`/api/golf/rankings/${year.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch rankings');
        }
        const rankings = await response.json();
        setData(rankings);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [year]);



  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({
          pageIndex,
          pageSize,
        });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      } else {
        setPageIndex(updater.pageIndex);
        setPageSize(updater.pageSize);
      }
    },
  });
  if (loading) return <Container>Loading Cool Golf Stuff...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <>
    <Container>
      <TableContainer className="overflow-x-auto overflow-y-auto" component={Paper}>
        {/* Year Filter */}
        <FormControl sx={{ margin: '1rem', maxWidth: '200px' }}>
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-simple-select"
            value={year}
            label="Year"
            onChange={(e) => handleYearChange(e.target.value)}
            size='small'
          >
            <MenuItem value={2024}>2024</MenuItem>
            <MenuItem value={2025}>2025</MenuItem>
              
          </Select>
        </FormControl>
        <Table className={styles.table}>
          <TableHead className={styles.header}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    className={styles.tableHead}
                    sx={{ align: 'right'}}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={styles.tableRow}
                sx={{ align: 'right'}}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={styles.tableCell}
                    onClick={() => {handleClick(row.original.PlayerID)}}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box className={styles.paginationControls}>
          <Button
            className={styles.paginationButton}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Typography className={styles.pageInfo}>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </Typography>
          <Button
            className={styles.paginationButton}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </Box>
      </TableContainer>
    </Container>
    </>
  );
} 

export default RankingsTable;