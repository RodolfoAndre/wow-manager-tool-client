import { Injectable } from '@angular/core';
import {
  Chart,
  LineController,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip
} from 'chart.js';
import { MountDropResponse } from './api.models';

Chart.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  LineController,
  Tooltip
);

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  secondaryColor = "#ffab40";

  public buildChart(mount: MountDropResponse) {
    const canvas = this.getCanvasElement(mount.name);
    if (!canvas) return;

    const ctx = this.getCanvasContext(canvas);
    if (!ctx) return;

    const labels = this.getLabels(mount.maxAttempts, mount.tries);
    const data = this.buildChartData(labels, mount);
    const options = this.buildChartOptions(mount);

    this.renderChart(ctx, data, options);
  }

  private getCanvasElement(chartName: string): HTMLCanvasElement | null {
    const chartId = this.getChartId(chartName);
    const canvas = document.getElementById(chartId) as HTMLCanvasElement;
    if (!canvas) {
      console.error(`Canvas with id ${chartId} not found`);
    }
    return canvas;
  }

  private getCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error(`Could not get 2D context for canvas`);
    }
    return ctx;
  }

  private buildChartData(labels: Array<number>, mount: MountDropResponse) {
    return {
      labels: labels,
      datasets: [{
        label: "To try",
        pointBorderColor: this.secondaryColor,
        pointBackgroundColor: labels.map((label) => +label === mount.tries ? '#880e4f' : this.secondaryColor),
        borderColor: this.secondaryColor,
        data: this.getData(mount.dropRate, labels),
        fill: false
      }]
    };
  }

  private buildChartOptions(mount: MountDropResponse) {
    return {
      elements: {
        point: { radius: 3 }
      },
      scales: {
        y: {
          type: 'linear',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Chance of drop in %'
          }
        },
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Num. of Tries'
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: (tooltipItem: any) => this.getTooltipTitle(tooltipItem, mount),
            label: (tooltipItem: any) => this.getTooltipLabel(tooltipItem)
          }
        }
      }
    };
  }

  private getTooltipTitle(tooltipItem: any, mount: MountDropResponse) {
    let label = `Tries: ${tooltipItem[0].label}`;
    if (+tooltipItem[0].label === mount.tries) {
      label += " (You're here! C'mon, just one more try!)";
    }
    return label;
  }

  private getTooltipLabel(tooltipItem: any) {
    const value = tooltipItem.raw as number;
    const twoDecimal = Math.round(value * 100) / 100;
    return `Drop chance: ${twoDecimal}%`;
  }

  private renderChart(ctx: CanvasRenderingContext2D, data: any, options: any) {
    new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });
  }

  private getData(mountDropRate: number, labels : Array<number>) : Array<number> {
    let resul : Array<number> = [];
    let i : number;
    for (i = 0; i < labels.length; i++) {
      let curRate = 1 - Math.pow(1 - mountDropRate, labels[i]);
      if (curRate === 1) {
        curRate = 0.99;
      }
      curRate = curRate * 100.0;
      resul.push(curRate);
    }

    return resul;
  }

  public getChartId(name: string) {
    return "chart-" + name.replace(" ", "-").toLowerCase();
  }

  private getLabels(maxAttempts: number, attempts: number) : Array<number> {
    const values = new Set<number>(); // Use a Set to avoid duplicates
    let factor = Math.round(maxAttempts / 19); // Calculate factor to get approximately 19 steps (leaving room for 'attempts')

    // Fill the values with incremental numbers based on the factor
    for (let i = 0; i * factor <= maxAttempts; i++) {
      values.add(i * factor);
    }

    // Ensure 'attempts' is included in the set
    values.add(attempts);

    // Convert set to an array and sort
    let resultArray = Array.from(values).sort((x, y) => +x - +y);

    // Check for intervals smaller than factor and replace with 'attempts' if needed
    resultArray = resultArray.map((value) => {
      if (Math.abs(value - attempts) < factor) {
        return attempts; // Replace value with 'attempts' if the difference is smaller than the factor
      }
      return value;
    });

    // Remove duplicates by converting back to a Set and then back to an array
    resultArray = Array.from(new Set(resultArray));

    // Ensure the array has exactly 20 elements
    while (resultArray.length < 20) {
      resultArray.push(maxAttempts); // If not enough elements, add maxAttempts to the end
    }

    if (resultArray.length > 20) {
      // Trim the array to exactly 20 elements, ensuring 'attempts' is included
      resultArray = resultArray.slice(0, 19); // Keep first 19 elements
      if (!resultArray.includes(attempts)) {
        resultArray.push(attempts); // Add 'attempts' back if it's missing
      }
    }

    return resultArray.sort((x, y) => +x - +y);
  }
}
















