export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  registrationDate: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image?: string;
  status: 'upcoming' | 'past';
  members: Member[];
}

export type ArticleType = 'article' | 'document';

export interface Article {
  id: string;
  title: string;
  type: ArticleType;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  fileUrl?: string;       // object URL created from uploaded file
  fileName?: string;      // original file name (e.g. "rapport.pdf")
  fileSize?: number;      // bytes
  fileMime?: string;      // e.g. "application/pdf"
}

export type ActionType =
  | 'create_event' | 'edit_event' | 'delete_event'
  | 'create_challenge' | 'edit_challenge' | 'delete_challenge'
  | 'create_article' | 'edit_article' | 'delete_article'
  | 'validate_submission' | 'reject_submission'
  | 'member_registration' | 'member_participation' | 'member_submission';

export type EntityType = 'event' | 'challenge' | 'member' | 'score' | 'article';

export interface HistoryEntry {
  id: string;
  actionType: ActionType;
  entityType: EntityType;
  entityName: string;
  author: string;
  authorRole: 'admin' | 'member';
  date: string;
  details?: string;
}

export type Difficulty = 'easy' | 'medium' | 'hard';
export type ChallengeStatus = 'active' | 'finished';
export type SubmissionStatus = 'pending' | 'validated' | 'rejected';

export interface Submission {
  id: string;
  challengeId: string;
  memberId: string;
  memberFirstName: string;
  memberLastName: string;
  submissionDate: string;
  status: SubmissionStatus;
  pointsAwarded: number;
  note?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  deadline: string;
  points: number;
  difficulty: Difficulty;
  status: ChallengeStatus;
  submissions: Submission[];
}
