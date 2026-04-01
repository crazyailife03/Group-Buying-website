"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endTime: string;
  compact?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function calcTimeLeft(endTime: string): TimeLeft {
  const diff = new Date(endTime).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

export function CountdownTimer({ endTime, compact }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft(endTime));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft(endTime)), 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  if (timeLeft.expired) {
    return <span className="text-red-500 font-bold">已結束</span>;
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  if (compact) {
    return (
      <div className="flex items-center gap-1 text-sm">
        <span className="bg-[#ee4d2d] text-white px-1.5 py-0.5 rounded text-xs font-bold">
          {pad(timeLeft.days)}天
        </span>
        <span className="bg-[#ee4d2d] text-white px-1.5 py-0.5 rounded text-xs font-bold">
          {pad(timeLeft.hours)}
        </span>
        <span className="text-[#ee4d2d] font-bold">:</span>
        <span className="bg-[#ee4d2d] text-white px-1.5 py-0.5 rounded text-xs font-bold">
          {pad(timeLeft.minutes)}
        </span>
        <span className="text-[#ee4d2d] font-bold">:</span>
        <span className="bg-[#ee4d2d] text-white px-1.5 py-0.5 rounded text-xs font-bold">
          {pad(timeLeft.seconds)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {[
        { value: timeLeft.days, label: "天" },
        { value: timeLeft.hours, label: "時" },
        { value: timeLeft.minutes, label: "分" },
        { value: timeLeft.seconds, label: "秒" },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="bg-[#ee4d2d] text-white text-xl font-bold px-3 py-2 rounded-lg min-w-[52px] text-center">
            {pad(item.value)}
          </span>
          <span className="text-xs text-gray-500 mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
