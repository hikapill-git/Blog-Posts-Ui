export interface articleResponse {
  id: number;
  title: string;
  content: string;
  isApproved: boolean;
  likesCount: number;
  comments: CommentDto[];
}

export interface CommentDto {
  // Assuming basic properties for the comment,
  // you should update this to match your C# CommentDto
  id: number;
  text: string;
  username: string;
}
export interface postArticle {
  Title: string;
  Content: string;
}

export interface articlePendingResponse {
  id: number;
  title: string;
  content: string;
  isApproved: boolean;
  emailId: string;
  fName: string;
  lName: string;
}

export interface postComment {
  Text: string;
}
