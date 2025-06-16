// Speed of light constants for network latency calculations
const SPEED_OF_LIGHT = {
  MILES_PER_MS: 124, // miles per millisecond in fiber
  KM_PER_MS: 199.65  // kilometers per millisecond in fiber
};

class LatencyCalculator {
  private distanceInput: HTMLInputElement;
  private unitSelect: HTMLSelectElement;
  private fudgeInput: HTMLInputElement;
  private onewayResult: HTMLElement;
  private rttResult: HTMLElement;
  private themeToggleBtn: HTMLButtonElement;

  constructor() {
    this.distanceInput = document.getElementById('distance-input') as HTMLInputElement;
    this.unitSelect = document.getElementById('unit-select') as HTMLSelectElement;
    this.fudgeInput = document.getElementById('fudge-input') as HTMLInputElement;
    this.onewayResult = document.getElementById('oneway-result') as HTMLElement;
    this.rttResult = document.getElementById('rtt-result') as HTMLElement;
    this.themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLButtonElement;

    this.bindEvents();
    this.loadThemeFromStorage();
    this.bindThemeToggle();
    this.calculateLatency(); // Calculate initial values
  }

  private bindEvents(): void {
    // Calculate latency on any input change
    this.distanceInput.addEventListener('input', () => this.calculateLatency());
    this.unitSelect.addEventListener('change', () => this.calculateLatency());
    this.fudgeInput.addEventListener('input', () => this.calculateLatency());
  }

  private calculateLatency(): void {
    const distance = parseFloat(this.distanceInput.value) || 0;
    const unit = this.unitSelect.value;
    const fudgeFactor = parseFloat(this.fudgeInput.value) || 0;
    
    if (distance <= 0) {
      this.onewayResult.textContent = '--';
      this.rttResult.textContent = '--';
      return;
    }

    // Convert distance to miles if needed
    const distanceInMiles = unit === 'km' ? distance * 0.621371 : distance;
    
    // Calculate base latency (distance / speed of light in fiber)
    const baseLatency = distanceInMiles / SPEED_OF_LIGHT.MILES_PER_MS;
    
    // Apply fudge factor
    const oneWayLatency = baseLatency * (1 + fudgeFactor / 100);
    const rtt = oneWayLatency * 2;
    
    // Display results with appropriate precision
    this.onewayResult.textContent = oneWayLatency.toFixed(2);
    this.rttResult.textContent = rtt.toFixed(2);
  }

  /** Update the theme toggle icon based on dark mode state */
  private updateThemeIcon(isDark: boolean): void {
    this.themeToggleBtn.textContent = isDark ? '\uD83C\uDF19' : '\u2600\uFE0F';
  }

  /** Load theme preference from localStorage */
  private loadThemeFromStorage(): void {
    const stored = localStorage.getItem('theme');
    const dark = stored === 'dark';
    document.body.classList.toggle('dark', dark);
    this.updateThemeIcon(dark);
  }

  /** Toggle dark/light theme */
  private bindThemeToggle(): void {
    this.themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      this.updateThemeIcon(isDark);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new LatencyCalculator();
});
