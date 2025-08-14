import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Mythic-tech theme colors
export const mythicTheme = {
  gold: {
    500: '#FFD700',
    600: '#FFC107',
    700: '#FFB300',
  },
  white: {
    DEFAULT: '#FFFFFF',
    50: '#FAFAFA',
  },
  charcoal: {
    700: '#3D3D3D',
    800: '#2D2D2D',
    900: '#1A1A1A',
  },
  signal: '#00D4FF',
  danger: '#D9534F',
  gray: '#A9A6A0',
};

// Chart.js default options with mythic-tech theme
export const defaultChartOptions: ChartOptions<any> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: mythicTheme.white.DEFAULT,
        font: {
          family: 'Inter, sans-serif',
          size: 12,
          weight: '500',
        },
      },
    },
    title: {
      display: false,
      color: mythicTheme.white.DEFAULT,
      font: {
        family: 'Orbitron, sans-serif',
        size: 16,
        weight: '600',
      },
    },
    tooltip: {
      backgroundColor: mythicTheme.charcoal[800],
      titleColor: mythicTheme.gold[500],
      bodyColor: mythicTheme.white.DEFAULT,
      borderColor: mythicTheme.gold[500],
      borderWidth: 1,
      titleFont: {
        family: 'Orbitron, sans-serif',
        size: 14,
        weight: '600',
      },
      bodyFont: {
        family: 'Inter, sans-serif',
        size: 12,
      },
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        labelTextColor: function() {
          return mythicTheme.white.DEFAULT;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: mythicTheme.charcoal[700],
        borderColor: mythicTheme.charcoal[700],
      },
      ticks: {
        color: mythicTheme.gray,
        font: {
          family: 'Inter, sans-serif',
          size: 11,
        },
      },
    },
    y: {
      grid: {
        color: mythicTheme.charcoal[700],
        borderColor: mythicTheme.charcoal[700],
      },
      ticks: {
        color: mythicTheme.gray,
        font: {
          family: 'Inter, sans-serif',
          size: 11,
        },
      },
    },
  },
};

// Line chart specific options
export const lineChartOptions: ChartOptions<'line'> = {
  ...defaultChartOptions,
  elements: {
    line: {
      tension: 0.3,
      borderWidth: 2,
      borderColor: mythicTheme.gold[500],
      backgroundColor: `${mythicTheme.gold[500]}20`,
    },
    point: {
      radius: 4,
      borderWidth: 2,
      backgroundColor: mythicTheme.charcoal[900],
      borderColor: mythicTheme.gold[500],
      hoverRadius: 6,
      hoverBorderWidth: 3,
    },
  },
};

// Bar chart specific options
export const barChartOptions: ChartOptions<'bar'> = {
  ...defaultChartOptions,
  plugins: {
    ...defaultChartOptions.plugins,
    legend: {
      display: false,
    },
  },
  scales: {
    ...defaultChartOptions.scales,
    y: {
      ...defaultChartOptions.scales?.y,
      beginAtZero: true,
    },
  },
};

// Doughnut/Pie chart specific options
export const doughnutChartOptions: ChartOptions<'doughnut'> = {
  ...defaultChartOptions,
  plugins: {
    ...defaultChartOptions.plugins,
    legend: {
      position: 'bottom',
      labels: {
        ...defaultChartOptions.plugins?.legend?.labels,
        padding: 20,
      },
    },
  },
};

// Dataset color schemes
export const datasetColors = {
  primary: {
    backgroundColor: `${mythicTheme.gold[500]}80`,
    borderColor: mythicTheme.gold[500],
    hoverBackgroundColor: mythicTheme.gold[600],
    hoverBorderColor: mythicTheme.gold[600],
  },
  secondary: {
    backgroundColor: `${mythicTheme.signal}80`,
    borderColor: mythicTheme.signal,
    hoverBackgroundColor: mythicTheme.signal,
    hoverBorderColor: mythicTheme.signal,
  },
  danger: {
    backgroundColor: `${mythicTheme.danger}80`,
    borderColor: mythicTheme.danger,
    hoverBackgroundColor: mythicTheme.danger,
    hoverBorderColor: mythicTheme.danger,
  },
  multiColor: [
    mythicTheme.gold[500],
    mythicTheme.signal,
    mythicTheme.danger,
    mythicTheme.gold[600],
    mythicTheme.gold[700],
    mythicTheme.gray,
  ],
};

// Gradient creator for charts
export function createGradient(
  ctx: CanvasRenderingContext2D,
  color: string,
  opacity: number = 0.2
): CanvasGradient {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, `${color}${Math.round(opacity * 255).toString(16)}`);
  gradient.addColorStop(1, `${color}00`);
  return gradient;
}

// Export Chart.js for direct use
export { ChartJS };
