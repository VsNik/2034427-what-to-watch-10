export type ReviewUserType = {
  id: number;
  name: string;
}

export type CommentType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: ReviewUserType;
}

export type NewCommentType = {
  filmId: number,
  comment: string;
  rating: number;
}
