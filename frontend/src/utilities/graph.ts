export type ILineData = {
  x: number;
  y: number;
}[];

export const formatLineData = (data: ILineData) => [
  {
    id: 'series',
    color: 'hsl(246, 70%, 50%)',
    data,
  },
];
