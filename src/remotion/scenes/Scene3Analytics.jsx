import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AnnualCashFlowChart } from '../../components/dashboard/AnnualCashFlowChart.jsx';
import { TransactionHistory } from '../../components/dashboard/TransactionHistory.jsx';
import { ConnectedAccounts } from '../../components/dashboard/ConnectedAccounts.jsx';
import { INITIAL_ACCOUNTS } from '../../data/dashboardData.js';

export const Scene3Analytics = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterProgress = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.8 },
  });

  // Scene exit transition (towards frame 210-240)
  const exitOpacity = interpolate(frame, [210, 240], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitTranslateY = interpolate(frame, [210, 240], [0, -30], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Dynamic Month scrubber over time (progressing through months 4 to 10)
  const animatedMonthIdx = Math.min(
    11,
    Math.floor(interpolate(frame, [20, 180], [4, 10], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }))
  );

  const scale = interpolate(frame, [0, 240], [0.98, 1.01]);
  const translateY = interpolate(enterProgress, [0, 1], [40, 0]) + exitTranslateY;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center p-16"
      style={{
        opacity: Math.min(enterProgress, exitOpacity),
        transform: `scale(${scale}) translateY(${translateY}px)`,
      }}
    >
      {/* Header Bar */}
      <div className="w-full max-w-[1500px] mb-6 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-violet-link text-label-sm font-body font-semibold mb-2">
            <span className="material-symbols-outlined text-body-sm">timeline</span>
            <span>Predictive Intelligence</span>
          </div>
          <h2 className="text-display-lg-mobile lg:text-headline-lg font-display font-bold text-on-surface">
            Cash Flow Dynamics & Account Health
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl obsidian-surface border border-outline flex items-center gap-2 text-label-sm text-on-surface font-body">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span>Balance</span>
            <span className="w-2.5 h-2.5 rounded-full bg-secondary ml-2" />
            <span>Income</span>
            <span className="w-2.5 h-2.5 rounded-full bg-error ml-2" />
            <span>Expense</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Chart (8 cols) + Connected Accounts / Transactions (4 cols) */}
      <div className="w-full max-w-[1500px] grid grid-cols-12 gap-6 items-stretch">
        <div className="col-span-8 flex flex-col">
          <AnnualCashFlowChart
            chartYear="2026"
            onChartYearChange={() => {}}
            activeMonthIdx={animatedMonthIdx}
            onSelectMonth={() => {}}
            onMoreClick={() => {}}
          />
        </div>

        <div className="col-span-4 flex flex-col">
          <ConnectedAccounts
            accounts={INITIAL_ACCOUNTS.slice(0, 3)}
            onDisconnect={() => {}}
            onRetrySync={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
