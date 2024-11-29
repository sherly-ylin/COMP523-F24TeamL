  
// export interface IReview {
//     _id?: string;
//     team_id: Types.ObjectId;
//     admin_id: Types.ObjectId;
//     login: string;
//     password: string;
//     status: ReviewStatus;
//     assigned_date: Date;
// }

export enum ReviewStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
}