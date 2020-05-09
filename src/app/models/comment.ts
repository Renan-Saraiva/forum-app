export interface Comment {
    text: string;
    user: string;
    id: string;
    createdAt: Date;
    replies: any[];
}