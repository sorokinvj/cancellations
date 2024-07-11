export type Insight = {
  uid: string;
  insight: string;
  transcriptionBlock: string;
  time?: number;
  processingTimeInSec?: number;
  error?: string;
};

export type Meeting = {
  aiModel?: string;
  duration?: number;
  durationInSec?: number;
  lastError: string;
  insights?: Insight[];
  language: string;
  startTime: number;
  endTime: number;
  transcriptionService: string;
  jobPosition: string;
};

export interface ModelStats {
  nMeetings: number;
  totalDuration: number;
  meanModelTime: number;
  medianModelTime: number;
}

export interface MeetingStats {
  [key: string]: ModelStats;
}

export type InsightType = { q: string[]; h?: string[] };

export type ModelData = {
  model: string;
  processingTime: number;
  insight: string;
};

export type UserSettings = {
  jobPosition: string;
  language: string;
};

export type UserData = {
  isAdmin?: boolean;
  createdAt: number;
  displayName: string;
  email: string;
  meetings?: Meeting[];
  settings: UserSettings;
  updatedAr: number;
  usageMinutes: number;
};

export type WeeklySummary = {
  name: string;
  newUsers: number;
  newUsersWithMeetings: number;
  activeVisitors: number;
}
